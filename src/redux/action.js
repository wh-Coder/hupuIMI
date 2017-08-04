export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function loginAction(reload) {
  return {
    type: LOGIN,
    is_login: true,
    result: reload.result
  }
}

export function logoutAction() {
  return {
    type: LOGOUT,
    is_login: false,
    result: {}
  }
}