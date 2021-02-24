import { combineReducers } from "redux";
import userStateReducer from "./UserStateReducer";

export const rootReducer = combineReducers({
  userState: userStateReducer,
});
