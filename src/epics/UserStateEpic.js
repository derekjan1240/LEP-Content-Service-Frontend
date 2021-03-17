import Axios from "axios";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { switchMap, map, takeUntil, catchError } from "rxjs/operators";
import { LOGIN_SITE, LOGIN_SITE_CANCELLED, LOGOUT_SITE } from "../actiontypes";
import { setUserState, userLoginFail } from "../actions/UtilActions";
import { showFailSwal } from "../utilSwal";

const userStateEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_SITE),
    switchMap((action) => {
      return from(
        Axios({
          method: "post",
          url: `${process.env.REACT_APP_AUTHENTICATION_SERVICE}/auth/jwt/login`,
          data: action.payload,
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

export default userStateEpic;
