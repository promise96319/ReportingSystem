import * as user from './user'
import * as userManager from './userManager'
import * as company from './company'
import * as account from './account'
import * as batch from './batch'
import * as mapping from './mapping'
import * as entries from './entries'

export default {
  ...user,
  ...userManager,
  ...company,
  ...account,
  ...batch,
  ...mapping,
  ...entries,
}