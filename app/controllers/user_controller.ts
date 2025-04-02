import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { apiResponse } from '../common/api_response.js'

export default class UserController {
  private userService = new UserService()
  public async register({ request }: HttpContext) {
    const { mobileNumber } = request.only(['mobileNumber'])
    return this.userService.register(mobileNumber)
  }

  public async login({ request }: HttpContext) {
    const { mobileNumber, otp } = request.only(['mobileNumber', 'otp'])
    return this.userService.login({ mobileNumber, otp })
  }

  public async updateUser({ request }: HttpContext) {
    const bodyRequest = request.body()
    const { id } = request.params()
    return this.userService.updateUserDetails(id, bodyRequest)
  }

  public async fetchUserList({}: HttpContext) {
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
