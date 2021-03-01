import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';

import comment, { commentSaga } from './comment';
import commentwrite, { commentWriteSaga } from './commentwrite';
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  comment,
  commentwrite,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),

    commentSaga(),
    commentWriteSaga(),
  ]);
}

export default rootReducer;
