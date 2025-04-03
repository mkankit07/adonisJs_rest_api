/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'
import { ROLES } from '../constants/constant.js'

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability((user: User, updateUser: User) => {
  return user.id === updateUser.id
})

export const viewUserList = Bouncer.ability((user: User | null) => {
  return user?.role === ROLES.ADMIN
})
