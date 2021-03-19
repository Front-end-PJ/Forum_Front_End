import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
   createRequestActionTypes,
} from "../lib/createRequestSaga";

const TEMP_SET_USER = "user/TEMP_SET_USER"; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS] = createRequestActionTypes("user/CHECK");
const LOGOUT = "user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

// function checkFailureSaga() {
//   try {
//     console.log();
//     localStorage.removeItem("user"); // localStorage 에서 user 제거하고
//   } catch (e) {
//     console.log("localStorage is not working");
//   }
// }

function* logoutSaga() {
   try {
      yield call(authAPI.logout); // logout API 호출
      console.log("hjisadfjaiskdlf");
      localStorage.removeItem("user"); // localStorage 에서 user 제거
   } catch (e) {
      console.log(e);
   }
}

export function* userSaga() {
   yield takeLatest(CHECK, checkSaga);
   yield takeLatest(LOGOUT, logoutSaga);
   // yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const initialState = {
   data: null,
   user: null,
   checkError: null,
};

export default handleActions(
   {
      [TEMP_SET_USER]: (state, { payload: user }) => ({
         ...state,
         user,
      }),
      [CHECK_SUCCESS]: (state, { payload: data }) => ({
         ...state,
         data,
         user: state.data.username,
         checkError: null,
      }),
      // [CHECK_FAILURE]: (state, { payload: error }) => ({
      //   ...state,
      //   user: null,
      //   checkError: error,
      // }),
      [LOGOUT]: (state) => ({
         ...state,
         user: null,
      }),
   },
   initialState
);
