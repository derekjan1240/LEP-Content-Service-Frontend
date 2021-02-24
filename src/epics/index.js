import { combineEpics } from "redux-observable";

import userStateEpic from "./UserStateEpic";

export const rootEpic = combineEpics(userStateEpic);
