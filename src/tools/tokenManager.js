import Cookies from 'js-cookie'

const TOKEN_KEY = 'remember_token'

const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

const clearToken = () => {
  Cookies.remove(TOKEN_KEY)
}

export default {
  getToken,
  clearToken
}
