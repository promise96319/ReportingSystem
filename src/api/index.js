import * as user from './user'
import * as userManager from './userManager'
import * as company from './company'
import * as account from './account'

export default {
  ...user,
  ...userManager,
  ...company,
  ...account,
}