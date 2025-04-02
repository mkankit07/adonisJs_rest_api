import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { apiResponse } from '../common/api_response.js'
import { viewUserList } from '#abilities/main'
import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'

export default class UserController {
  private userService = new UserService()
  public async register({ request }: HttpContext) {
    const { mobileNumber, role } = request.only(['mobileNumber', 'role'])
    return this.userService.register(mobileNumber, role)
  }

  public async login({ request }: HttpContext) {
    const { mobileNumber, otp } = request.only(['mobileNumber', 'otp'])
    return this.userService.login({ mobileNumber, otp })
  }

  public async updateUser({ bouncer, request }: HttpContext) {
    const bodyRequest = request.body()
    const { id } = request.params()
    return this.userService.updateUserDetails(bouncer as unknown as Bouncer<User>, id, bodyRequest)
  }

  public async fetchUserList({ bouncer }: HttpContext) {
    if (await bouncer.denies(viewUserList)) {
      return apiResponse.unAuthorized('Access denied')
    }
    return this.userService.fetchUserList()
  }

  public async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return apiResponse.badRequest('Token not found')
    }
    return this.userService.logout(user, token)
  }
}
