import {
  LOGIN_SITE,
  LOGOUT_SITE,
  SET_USER_STATE,
  LOGIN_SITE_FAIL,
} from "../actiontypes";

export function userLogin(payload) {
  return {
    type: LOGIN_SITE,
    payload,
  };
}

export function setUserState(payload) {
  return {
    type: SET_USER_STATE,
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
