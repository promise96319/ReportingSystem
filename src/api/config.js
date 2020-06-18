const VERSION = 'v1'

// export const HOST = 'http://47.110.132.204:5000'

const URL = `/api/${VERSION}`

const user = {
  login: `${URL}/user/login`,
  getUserInfo: `${URL}/user`,
  logout: `${URL}/user/logout`,
}

const userManager = {
  getUserList: `${URL}/company`,
  inviteUser: `${URL}/user/invitation`,
}

const company = {
  getCompanyList: `${URL}/company`,
  getCompanyDetail: `${URL}/company`,
  uploadCompanyLogo: `${URL}/company/logo`,
  addCompany: `${URL}/company`,
  updateCompany: `${URL}/company`,
}

export default {
  ...user,
  ...userManager,
  ...company,
}


