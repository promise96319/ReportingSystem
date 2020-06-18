import * as user from './user'
import * as userManager from './userManager'
import * as company from './company'

export default {
  ...user,
  ...userManager,
  ...company,
}