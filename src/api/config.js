const VERSION = 'v1'

// export const HOST = 'http://47.110.132.204:5000'

const URL = `/api/${VERSION}`

const user = {
  login:              `${URL}/user/login`,     // 登录
  getUserInfo:        `${URL}/user`,           // 获取当前用户信息（维持登录状态）
  logout:             `${URL}/user/logout`,    // 登出
}

const userManager = {
  getUserList:        `${URL}/company`,        // 根据公司id获取公司下用户
  inviteUser:         `${URL}/user/invitation`,// 根据公司id邀请用户
  checkEmail:         `${URL}/user/email`,     // 检验邮箱中链接token是否有效
  register:           `${URL}/user/register`,  // 根据token，密码注册用户
  updatePassword:     `${URL}/user`,           // 更新密码
  updateRole:         `${URL}/company`,        // 更新用户角色
  deleteUser:         `${URL}/company`,        // 移除公司下用户
}

const company = {
  getCompanyList:     `${URL}/company`,        // 获取用户所在的公司列表
  getCompanyDetail:   `${URL}/company`,        // 根据公司id获取公司详情
  uploadCompanyLogo:  `${URL}/company/logo`,   // 上传公司logo
  addCompany:         `${URL}/company`,        // 添加公司（暂无添加）
  updateCompany:      `${URL}/company`,        // 更新公司信息
}

const account = {
  getAccountList:     `${URL}/company`,        // 获取会计科目列表
  addAccount:         `${URL}/company`,        // 新增 Account
  updateAccount:      `${URL}/company`,        // 更新会计科目列表
  getAccountType:     `${URL}/accounts_type`,  // 查询 Account Type
}

export default {
  ...user,
  ...userManager,
  ...company,
  ...account,
}


