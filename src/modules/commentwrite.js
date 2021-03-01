import { createAction, handleActions } from 'redux-actions';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'commentwrite/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'commentwrite/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('commentwrite/WRITE_COMMENT'); // 댓글 작성
const [
  WRITE_RECOMMENT,
  WRITE_RECOMMENT_SUCCESS,
  WRITE_RECOMMENT_FAILURE,
] = createRequestActionTypes('commentwrite/WRITE_RECOMMENT'); // 댓글 작성
// const REMOVE = 'comment/REMOVE';
const SET_ORIGINAL_COMMENT = 'commentwrite/SET_ORIGINAL_COMMENT';
// const TOGGLE = 'comment/TOGGLE';
// const [
//   UPDATE_COMMENT,
//   UPDATE_COMMENT_SUCCESS,
//   UPDATE_COMMENT_FAILURE,
// ] = createRequestActionTypes('write/UPDATE_COMMENT'); // 포스트 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ pk, content }) => ({
  pk,
  content,
}));
export const writeReComment = createAction(
  WRITE_RECOMMENT,
  ({ pk, content }) => ({
    pk,
    content,
  }),
);
export const setOriginalComment = createAction(
  SET_ORIGINAL_COMMENT,
  (post) => post,
);
// export const updateComment = createAction(UPDATE_COMMENT, ({ id, text }) => ({
//   id,
//   text,
// }));

const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  postsAPI.writeCommnet,
);
// const updatePostSaga = createRequestSaga(UPDATE_COMMENT, postsAPI);
const wrtieRecommentSaga = createRequestSaga(
  WRITE_RECOMMENT,
  postsAPI.writeReCommnet,
);
export function* commentWriteSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(WRITE_RECOMMENT, wrtieRecommentSaga);
  // yield takeLatest(UPDATE_COMMENT, updatePostSaga);
}

const initialState = {
  pk: 3,
  content: '123',
  post: null,
  selectComment: null,
  commentError: null,
};

const commentwrite = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_COMMENT]: (state) => ({
      ...state,
      // post와 postError를 초기화
      post: null,
      postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    [WRITE_RECOMMENT_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_RECOMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    // [SET_ORIGINAL_COMMENT]: (state, { payload: post }) => ({
    //   ...state,
    //   title: post.title,
    //   body: post.body,
    //   tags: post.tags,
    //   originalPostId: post._id,
    // }),
    // [UPDATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
    //   ...state,
    //   comment,
    // }),
    // [UPDATE_COMMENT_FAILURE]: (state, { payload: postError }) => ({
    //   ...state,
    //   postError,
    // }),
  },
  initialState,
);

export default commentwrite;
