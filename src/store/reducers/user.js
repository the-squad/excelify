// @flow

import { USER } from '../actions/user';

const initialState = {
  name: undefined,
  email: undefined,
  token: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case USER.LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        name: payload.name,
        email: payload.email,
      };
    }

    case USER.LOGIN:
    case USER.SIGNUP: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }

    default:
      return state;
  }
};
