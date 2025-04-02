import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare gender: string | null

  @column()
  declare dob: string | null

  @column()
  declare profileImage: string | null

  @column()
  declare role: string

  @column()
  declare mobileNumber: string

  @column()
  declare otp: string | null

  @column()
  declare password: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
  
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
