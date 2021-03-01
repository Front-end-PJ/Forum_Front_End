import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 게시판 목록 불러오기
const [
  READ_BOAD,
  READ_BOAD_SUCCESS,
  READ_BOAD_FAILURE,
] = createRequestActionTypes('posts/READ_BOARD');

// 글 목록 불러오기
const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

const TOGGLE_MENU = 'posts/TOGGLE/MENU';

export const toggleMenu = createAction(TOGGLE_MENU);

// 액션 만들어주기

export const readBoard = createAction(READ_BOAD);
export const listPosts = createAction(LIST_POSTS, (id) => id);

//Saga 만들어주기

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.readPost);
const readBoardSaga = createRequestSaga(READ_BOAD, postsAPI.getBoard);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
  yield takeLatest(READ_BOAD, readBoardSaga);
}

const initialState = {
  boards: null,
  posts: null,
  data: null,
  postsdata: null,
  error: null,
  lastPage: 1,
  toggle: false,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      postsdata: posts.data,
      posts,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_BOAD_SUCCESS]: (state, { payload: boards, meta: response }) => ({
      ...state,
      boards,
      data: boards.data,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    // (data = posts.data)
    // console.log(data)
    [READ_BOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [TOGGLE_MENU]: (state, { payload: toggle }) => ({
      ...state,
      toggle: !toggle,
    }),
  },
  initialState,
);

export default posts;
