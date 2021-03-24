import Axios from "axios";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { switchMap, map, takeUntil, catchError } from "rxjs/operators";
import { LOGIN_SITE, LOGIN_SITE_CANCELLED, USER_SIGNUP } from "../actiontypes";
import { setUserState, userLoginFail } from "../actions/UtilActions";
import { showFailSwal } from "../utilSwal";

export const userStateLoginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_SITE),
    switchMap((action) => {
      return from(
        Axios({
          method: "post",
          url: action.payload.route,
          data: action.payload.data,
          withCredentials: true,
        })
      ).pipe(
        map((response) => {
          if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
          }
          return setUserState(response);
        }),
        takeUntil(action$.ofType(LOGIN_SITE_CANCELLED)),
        catchError(() => {
          showFailSwal("登入失敗!");
          return of(userLoginFail());
        })
      );
    })
  );
