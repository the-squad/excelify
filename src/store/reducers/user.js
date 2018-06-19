// @flow

import Cookies from 'js-cookie';

import { USER } from '../actions/user';

const NAME = 'GP_NAME';
const TOKEN = 'GP_TOKEN';
const initialState = {
  name: undefined,
  email: undefined,
  token: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  isError: false,
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case USER.LOGGED_IN: {
      Cookies.set(NAME, payload.name);
      Cookies.set(TOKEN, payload.token);

      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        token: payload.token,
        name: payload.name,
        email: payload.email,
      };
    }

    case USER.LOG_OUT: {
      Cookies.remove(NAME);
      Cookies.remove(TOKEN);

      return {
        name: undefined,
        email: undefined,
        token: undefined,
        isLoggedIn: false,
        isLoggingIn: false,
        isError: false,
      };
    }

    case USER.LOGIN:
    case USER.SIGNUP: {
      return {
        ...state,
        isLoggingIn: true,
        isError: false,
      };
    }

    case USER.EMAIL_EXISTS: {
      return {
        ...state,
        isError: true,
        isLoggingIn: false,
      };
    }

    case USER.LOAD: {
      return {
        ...state,
        isLoggedIn: true,
        name: payload.name,
        token: payload.token,
      };
    }

    default:
      return state;
  }
};
