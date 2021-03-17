import { combineEpics } from "redux-observable";

import userStateEpic from "./UserStateEpic";
import authCheckEpic from "./AuthCheckEpic";

export const rootEpic = combineEpics(userStateEpic, authCheckEpic);
