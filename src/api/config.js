const VERSION = 'v1'

// export const HOST = 'http://47.110.132.204:5000'

const URL = `/api/${VERSION}`

// 用户登录相关接口
const user = {
  login:              `${URL}/user/login`,     // 登录
  getUserInfo:        `${URL}/user`,           // 获取当前用户信息（维持登录状态）
  logout:             `${URL}/user/logout`,    // 登出
}

// 用户管理相关接口
const userManager = {
  getUserList:        `${URL}/company`,        // 根据公司id获取公司下用户
  inviteUser:         `${URL}/user/invitation`,// 根据公司id邀请用户
  checkEmail:         `${URL}/user/email`,     // 检验邮箱中链接token是否有效
  register:           `${URL}/user/register`,  // 根据token，密码注册用户
  updatePassword:     `${URL}/user`,           // 更新密码
  updateRole:         `${URL}/company`,        // 更新用户角色
  deleteUser:         `${URL}/company`,        // 移除公司下用户
}

// 公司信息管理相关接口
const company = {
  getCompanyList:     `${URL}/company`,        // 获取用户所在的公司列表
  getCompanyDetail:   `${URL}/company`,        // 根据公司id获取公司详情
  uploadCompanyLogo:  `${URL}/company/logo`,   // 上传公司logo
  addCompany:         `${URL}/company`,        // 添加公司（暂无添加）
  updateCompany:      `${URL}/company`,        // 更新公司信息
  updateCompanyRegion:`${URL}/company`,        // 更新公司下的region
}

// 科目表相关接口
const account = {
  getAccountList:     `${URL}/company`,        // 获取会计科目列表
  addAccount:         `${URL}/company`,        // 新增 Account
  updateAccount:      `${URL}/company`,        // 更新会计科目列表
  getAccountType:     `${URL}/accounts_type`,  // 查询 Account Type
}

// 批次相关接口
const batch = {
  uploadBatch:        `${URL}/batch/company`,  // 上传 batch
  getBatch:           `${URL}/batch/company`,  // 根据 年月获取 batch 批次
  queryBatch:         `${URL}/batch`,          // 根据 batch_id 获取batch
  deleteBatch:        `${URL}/batch`,          // 删除batch
}

// 科目匹配相关接口
const mapping = {
  uploadMappingList:  `${URL}/mapping/company`, // 上传进行匹配后的未匹配项
  getMappingList:     `${URL}/mapping/company`, // 根据公司id查询 mapping 结果
  updateMappingList:  `${URL}/mapping/company`, // 根据公司id更新 mapping 结果
}

// 匹配接口总览接口
const entries = {
  getEntries:         `${URL}/entries/company`, // 获取所有entries
}

// 报表相关接口
const report = {
  getGeneralLedger:   `${URL}/report/company`,  // 获取 general ledger
}

export default {
  ...user,
  ...userManager,
  ...company,
  ...account,
  ...batch,
  ...mapping,
  ...entries,
  ...report,
}


