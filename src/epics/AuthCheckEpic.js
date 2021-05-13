import Axios from "axios";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { USER_AUTH_CHECK } from "../actiontypes";
import { setUserState } from "../actions/UtilActions";
import { clearExpiredToken } from "../actions/AuthActions";

const authCheckEpic = (action$) =>
  action$.pipe(
    ofType(USER_AUTH_CHECK),
    switchMap((action) => {
      return from(
        Axios({
          method: "get",
          url: `${process.env.REACT_APP_AUTHENTICATION_SERVICE}/users`,
          headers: { Authorization: `Bearer ${action.payload}` },
        })
      ).pipe(
        map((response) => {
          // 透過 Token 取得 USER 資料
          return setUserState(response);
        }),
        catchError(() => {
          // 當前 Token 已過期
          return of(clearExpiredToken());
        })
      );
    })
  );

export default authCheckEpic;
