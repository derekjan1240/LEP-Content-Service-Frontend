import { USER_AUTH_CHECK, CLEAR_EXPIRED_TOKEN } from "../actiontypes";

export function userAuthCheck(payload) {
  return {
    type: USER_AUTH_CHECK,
    payload,
  };
}

export function clearExpiredToken() {
  return {
    type: CLEAR_EXPIRED_TOKEN,
  };
}
