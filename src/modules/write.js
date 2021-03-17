import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as api from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "write/INITIALIZE"; // 모든 내용 초기화
const CHANGE_FIELD = "write/CHANGE_FIELD"; // 특정 key 값 바꾸기
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes("write/WRITE_POST"); // 포스트 작성
const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes("write/UPDATE_POST"); // 포스트 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_POST, ({ title, pk, content }) => ({
  title,
  pk,
  content,
}));
export const setOriginalPost = createAction(
  SET_ORIGINAL_POST,
  ({ title, pk, content, originalPostId }) => ({
    title,
    pk,
    content,
    originalPostId,
  })
);
export const updatePost = createAction(UPDATE_POST, ({ pk, content }) => ({
  pk,
  content,
}));

// saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, api.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  title: "",
  pk: "",
  content: "",
  originalPostId: "",
  post: null,
  postError: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      // post와 postError를 초기화
      post: null,
      postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, { payload: post, meta: response }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (
      state,
      { payload: { title, pk, content, originalPostId } }
    ) => ({
      ...state,
      title,
      pk,
      content,
      originalPostId,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState
);

export default write;
