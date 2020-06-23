import * as user from './user'
import * as userManager from './userManager'
import * as company from './company'
import * as account from './account'
import * as batch from './batch'

export default {
  ...user,
  ...userManager,
  ...company,
  ...account,
  ...batch,
}