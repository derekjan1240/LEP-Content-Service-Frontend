import { LOGOUT_SITE, SET_USER_STATE } from "../actiontypes";

const INITIAL_USER_STATE = null;

const userStateReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case LOGOUT_SITE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
      };
    case SET_USER_STATE:
      return {
        ...state,
        user: action.payload?.data?.user,
      };
    default:
      return state;
  }
};

export default userStateReducer;
