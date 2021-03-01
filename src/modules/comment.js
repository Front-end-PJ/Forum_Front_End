import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_COMMENT,
  READ_COMMENT_SUCCESS,
  READ_COMMENT_FAILURE,
] = createRequestActionTypes('post/READ_COMMENT');
const [
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
] = createRequestActionTypes('post/DELETE_COMMENT');
const UNLOAD_COMMENT = 'post/UNLOAD_COMMENT'; // 포스트 페이지에서 벗어날 때 데이터 비우기

const [
  READ_RECOMMENT,
  READ_RECOMMENT_SUUCCESS,
  READ_RECOMMENT_FAILURE,
] = createRequestActionTypes('post/READ_RECOMMENT');

export const deleteComment = createAction(DELETE_COMMENT, ({ pk }) => ({ pk }));
export const readComment = createAction(READ_COMMENT, (id) => id);
export const unloadComment = createAction(UNLOAD_COMMENT);
export const readRecomment = createAction(READ_RECOMMENT, (id) => id);

const readCommentSaga = createRequestSaga(READ_COMMENT, postsAPI.readComment);
const deleteCommentSaga = createRequestSaga(
  DELETE_COMMENT,
  postsAPI.deleteComment,
);
const readRecommentSaga = createRequestSaga(
  READ_RECOMMENT,
  postsAPI.readRecoment,
);
export function* commentSaga() {
  yield takeLatest(READ_COMMENT, readCommentSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(READ_RECOMMENT, readRecommentSaga);
}

const initialState = {
  comment: null,
  recomment: null,
  data: [],
  recommentdata: [],
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
    [READ_RECOMMENT_SUUCCESS]: (state, { payload: recomment }) => ({
      ...state,
      recommentdata: recomment.data,
      recomment,
    }),
    [READ_RECOMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_COMMENT]: () => initialState,
  },
  initialState,
);

export default post;
