import { LOGOUT_SITE, LOGIN_SITE_SUCCESS } from "../actiontypes";

const INITIAL_USER_STATE = {
  isLogin: false,
  authority: "0000",
  currentType: null,
};

const userStateReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case LOGOUT_SITE:
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    case LOGIN_SITE_SUCCESS:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userStateReducer;
