import { BaseSchema } from '@adonisjs/lucid/schema'
import { ROLES } from '../../app/constants/constant.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('mobile_number', 13).notNullable().unique()
      table.string('gender').nullable()
      table.string('dob').nullable()
      table.string('profile_image').nullable()
      table.string('otp', 6).nullable()
      table.string('role').notNullable().defaultTo(ROLES.USER)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
