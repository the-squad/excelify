// @flow

export const USER = {
  LOGIN: 'USER_LOGIN',
  LOGGED_IN: 'USER_LOGGED_IN',
  SIGNUP: 'USER_SIGNUP',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  WRONG_LOGIN: 'WRONG_LOGIN',
  LOG_OUT: 'USER_LOGOUT',
  LOAD: 'USER_LOAD',
};

export const login = (email: string, password: string): Object => ({
  type: USER.LOGIN,
  email,
  password,
});

export const loggedIn = (name: string, email: string, token: string): Object => ({
  type: USER.LOGGED_IN,
  name,
  email,
  token,
});

export const signUp = (name: string, email: string, password: string): Object => ({
  type: USER.SIGNUP,
  name,
  email,
  password,
});

export const emailAlreadyExists = (): Object => ({
  type: USER.EMAIL_EXISTS,
});

export const wrongLoginData = (): Object => ({
  type: USER.WRONG_LOGIN,
});

export const logOut = (): Object => ({
  type: USER.LOG_OUT,
});

export const loadUser = (name: string, token: string): Object => ({
  type: USER.LOAD,
  name,
  token,
});
