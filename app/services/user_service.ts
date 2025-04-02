import User from '#models/user'
import { apiResponse } from '../common/api_response.js'
import { UpdateUser } from '../constants/types.js'

export default class UserService {
  public async register(mobileNumber: string) {
    const user = new User()
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const existUser = await User.findBy('mobileNumber', mobileNumber)
    if (existUser) {
      existUser.otp = otp
      await existUser.save()
    } else {
      user.mobileNumber = mobileNumber
      user.otp = otp
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
    const token = await User.accessTokens.create(user)
    return apiResponse.okSuccess('Login success', { id: user.id, token })
  }

  public async updateUserDetails(id: string, data: UpdateUser) {
    const user = await User.findBy('id', id)
    if (!user) {
      if (!user) {
        return apiResponse.notFoundError('User account not found')
      }
    }
    await user.merge(data).save()
    return apiResponse.okSuccess('User details updated')
  }

  public async fetchUserList() {
    const user = await User.query()
    return apiResponse.okSuccess('User access successful', user)
  }

  public async logout(users: User, token: string | number | BigInt) {
    await User.accessTokens.delete(users, token)
    return apiResponse.okSuccess('Logged out')
  }
}
