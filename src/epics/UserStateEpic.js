import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { switchMap, map, takeUntil, catchError } from "rxjs/operators";
import { LOGIN_SITE, LOGIN_SITE_CANCELLED } from "../actiontypes";
import { userLoginSuccess, userLoginFail } from "../actions/UtilActions";

const userStateEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_SITE),
    switchMap((action) =>
      // Fake Login API
      ajax
        .getJSON(
          `https://jsonplaceholder.typicode.com/users/${Math.floor(
            Math.random() * Math.floor(10) + 1
          )}`
        )
        .pipe(
          map((response) => userLoginSuccess(response)),
          takeUntil(action$.ofType(LOGIN_SITE_CANCELLED)),
          catchError((error) => of(userLoginFail(error.xhr.statusText)))
        )
    )
  );

export default userStateEpic;
