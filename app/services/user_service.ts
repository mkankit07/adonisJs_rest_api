import { editUser } from '#abilities/main'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'
import { apiResponse } from '../common/api_response.js'
import { UpdateUser } from '../constants/types.js'
import db from '@adonisjs/lucid/services/db'
import emitter from '@adonisjs/core/services/emitter'

export default class UserService {
  public async register(mobileNumber: string, role = 'USER') {
    const user = new User()
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const existUser = await User.findBy('mobileNumber', mobileNumber)
    if (existUser) {
      existUser.otp = otp
      await existUser.save()
    } else {
      user.mobileNumber = mobileNumber
      user.otp = otp
      user.role = role
      await user.save()
    }
    return apiResponse.okSuccess('Please login with OTP', { otp })
  }

  public async login(data: { mobileNumber: string; otp: string }) {
    const user = await User.findBy('mobileNumber', data.mobileNumber)
    if (!user) {
      return apiResponse.notFoundError('User account not found')
    }
    if (user.otp !== data.otp) {
      return apiResponse.unAuthorized('Invalid OTP')
    }
    emitter.emit('user:registered', user)
    const token = await User.accessTokens.create(user)
    return apiResponse.okSuccess('Login success', { id: user.id, token })
  }

  public async updateUserDetails(bounce: Bouncer<User>, id: string, data: UpdateUser) {
    const user = await User.findBy('id', id)
    if (!user) {
      if (!user) {
        return apiResponse.notFoundError('User account not found')
      }
    }
    if (await bounce.denies(editUser, user)) {
      return apiResponse.unAuthorized('Access denied')
    }
    await user.merge(data).save()
    return apiResponse.okSuccess('User details updated')
  }

  public async fetchUserList(page: number, limit: number) {
    const offset = page - 1
    const [{ count }] = await db.from('users').count('*')

    // const paginateQuery = await db.from("users").paginate(offset, offset * limit + limit)
    const user = await db
      .from('users')
      .select({
        userId: 'id',
        mobileNumber: 'mobile_number',
        fullName: 'full_name',
        dob: 'dob',
        gender: 'gender',
        profileImage: 'profile_image',
      })
      .orderBy('id', 'desc')
      .offset(offset)
      .limit(offset * limit + limit)

    return apiResponse.okSuccess('User access successful', user, {
      page,
      limit,
      totalPage: Math.ceil(count / page),
      totalRecord: count,
    })
  }

  public async logout(users: User, token: string | number | BigInt) {
    await User.accessTokens.delete(users, token)
    return apiResponse.okSuccess('Logged out')
  }
}
