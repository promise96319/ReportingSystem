const getters = {
  user: state => state.user.user,
  companyList: state => state.company.companyList,
  currentCompany: state => state.company.currentCompany
}
export default getters