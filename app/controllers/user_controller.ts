import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'
import { apiResponse } from '../common/api_response.js'
import { viewUserList } from '#abilities/main'
import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import { userLoginValidator, userRegisterValidator, userUpdateValidator } from '#validators/user'
import app from '@adonisjs/core/services/app'

export default class UserController {
  private userService = new UserService()

  public async register({ request }: HttpContext) {
    const data = request.all()
    const payload = await userRegisterValidator.validate(data)
    return this.userService.register(payload.mobileNumber, payload.role)
  }

  public async login({ request }: HttpContext) {
    const data = request.all()
    const payload = await userLoginValidator.validate(data)
    return this.userService.login(payload)
  }

  public async updateUser({ bouncer, request }: HttpContext) {
    const data = request.all()
    const payload = await userUpdateValidator.validate(data)

    const { id } = request.params()
    return this.userService.updateUserDetails(bouncer as unknown as Bouncer<User>, id, payload)
  }

  public async fetchUserList({ bouncer, request }: HttpContext) {
    if (await bouncer.denies(viewUserList)) {
      return apiResponse.unAuthorized('Access denied')
    }
    const { page, limit } = request.only(['page', 'limit'])

    return this.userService.fetchUserList(Number.parseInt(page), Number.parseInt(limit))
  }

  public async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return apiResponse.badRequest('Token not found')
    }
    return this.userService.logout(user, token)
  }

  public async uploadMedia({ request }: HttpContext) {
    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!avatar?.isValid) {
      return apiResponse.badRequest(avatar?.errors[0].message)
    }
    await avatar.move(app.makePath('storage/uploads'))
    return apiResponse.okSuccess()
  }
}
