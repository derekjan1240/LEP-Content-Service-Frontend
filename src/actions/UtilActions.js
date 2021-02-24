import {
  LOGIN_SITE,
  LOGOUT_SITE,
  LOGIN_SITE_SUCCESS,
  LOGIN_SITE_FAIL,
} from "../actiontypes";

export function userLogin() {
  return {
    type: LOGIN_SITE,
  };
}

export function userLoginSuccess(payload) {
  console.log(payload);
  return {
    type: LOGIN_SITE_SUCCESS,
    payload,
  };
}

export function userLoginFail(payload) {
  return {
    type: LOGIN_SITE_FAIL,
    payload,
  };
}

export function userLogout() {
  return {
    type: LOGOUT_SITE,
  };
}
