import {
  LOGOUT_SITE,
  SET_USER_STATE,
  CLEAR_EXPIRED_TOKEN,
} from "../actiontypes";

const INITIAL_USER_STATE = {
  user: null,
  isChecking: true,
};

const userStateReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case CLEAR_EXPIRED_TOKEN:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
        isChecking: false,
      };
    case LOGOUT_SITE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
        isChecking: true,
      };
    case SET_USER_STATE:
      return {
        ...state,
        user: action.payload?.data?.user,
        isChecking: false,
      };
    default:
      return state;
  }
};

export default userStateReducer;
