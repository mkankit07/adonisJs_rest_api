/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UserController from '#controllers/user_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('user/register', [UserController, 'register'])
router.post('user/login', [UserController, 'login'])
router.get('user', [UserController, 'fetchUserList']).use(middleware.auth())
router.post('user/logout', [UserController, 'logout']).use(middleware.auth())
router.put('user/:id', [UserController, 'updateUser']).use(middleware.auth())
