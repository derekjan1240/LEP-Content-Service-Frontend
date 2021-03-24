import { combineEpics } from "redux-observable";

import { userStateLoginEpic } from "./UserStateEpic";
import authCheckEpic from "./AuthCheckEpic";

export const rootEpic = combineEpics(userStateLoginEpic, authCheckEpic);
