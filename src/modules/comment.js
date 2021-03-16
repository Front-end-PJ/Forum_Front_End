import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postsAPI from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";

const [
  READ_COMMENT,
  READ_COMMENT_SUCCESS,
  READ_COMMENT_FAILURE,
] = createRequestActionTypes("post/READ_COMMENT");
const [
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
] = createRequestActionTypes("post/DELETE_COMMENT");
const UNLOAD_COMMENT = "post/UNLOAD_COMMENT"; // 포스트 페이지에서 벗어날 때 데이터 비우기

const [
  READ_RECOMMENT,
  READ_RECOMMENT_SUUCCESS,
  READ_RECOMMENT_FAILURE,
] = createRequestActionTypes("post/READ_RECOMMENT");

const [
  CHANGE_COMMENT,
  CHANGE_COMMENT_SUUCCESS,
  CHANGE_COMMENT_FAILURE,
] = createRequestActionTypes("post/CHANGE_COMMENT");

const [
  CHANGE_RECOMMENT,
  CHANGE_RECOMMENT_SUUCCESS,
  CHANGE_RECOMMENT_FAILURE,
] = createRequestActionTypes("post/CHANGE_RECOMMENT");

const CLEAR_RECOMMENTS = "post/CLEAR_RECOMMENTS";

export const deleteComment = createAction(DELETE_COMMENT, ({ pk }) => ({ pk }));
export const readComment = createAction(READ_COMMENT, (id) => id);
export const unloadComment = createAction(UNLOAD_COMMENT);
export const readRecomment = createAction(READ_RECOMMENT, (id) => id);
export const changeComment = createAction(
  CHANGE_COMMENT,
  ({ pk, content }) => ({ pk, content })
);
export const changeReComment = createAction(
  CHANGE_RECOMMENT,
  ({ pk, content }) => ({ pk, content })
);
export const clearRecomments = createAction(CLEAR_RECOMMENTS);

const readCommentSaga = createRequestSaga(READ_COMMENT, postsAPI.readComments);
const deleteCommentSaga = createRequestSaga(
  DELETE_COMMENT,
  postsAPI.deleteComment
);
const readRecommentSaga = createRequestSaga(
  READ_RECOMMENT,
  postsAPI.readRecoment
);
const changeCommentSaga = createRequestSaga(
  CHANGE_COMMENT,
  postsAPI.changeComment
);
const changeReCommentSaga = createRequestSaga(
  CHANGE_RECOMMENT,
  postsAPI.changeReComment
);

export function* commentSaga() {
  yield takeLatest(READ_COMMENT, readCommentSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(READ_RECOMMENT, readRecommentSaga);
  yield takeLatest(CHANGE_COMMENT, changeCommentSaga);
  yield takeLatest(CHANGE_RECOMMENT, changeReCommentSaga);
}

const initialState = {
  comment: null,
  recomment: null,
  data: [],
  recommentdata: [],
  recommentList: [],
  error: null,
};

const post = handleActions(
  {
    [READ_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      data: comment.data,
      comment,
    }),
    [READ_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [DELETE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLEAR_RECOMMENTS]: (state, { payload: error }) => ({
      ...state,
      recommentList: [],
    }),
    [READ_RECOMMENT_SUUCCESS]: (state, { payload: recomment }) => ({
      ...state,
      recommentdata: recomment.data,
      recommentList: state.recommentList.concat(recomment.data),
      recomment,
    }),
    [READ_RECOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_COMMENT_SUUCCESS]: (state, { payload: comment }) => ({
      ...state,

      comment,
    }),
    [CHANGE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_RECOMMENT_SUUCCESS]: (state, { payload: recomment }) => ({
      ...state,

      recomment,
    }),
    [CHANGE_RECOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_COMMENT]: () => initialState,
  },
  initialState
);

export default post;
