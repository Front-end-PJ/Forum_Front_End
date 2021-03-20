import React from "react";
import Pagination from "../../components/posts/Pagination";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const PaginationContainer = ({ match }) => {
  const { posts, loading, boards } = useSelector(({ posts, loading }) => ({
    boards: posts.boards,
    posts: posts.posts,
    loading: loading["posts/LIST_POSTS"],
  }));

  let { pageId, boardId } = match.params;
  // 기본 페이지일 경우 pageId 를 1로 설정

  if (!pageId) {
    pageId = 1;
  }
  if (!boardId) {
    boardId = 1;
  }
  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!posts || loading) return null;

  pageId = parseInt(pageId, 10);
  boardId = parseInt(boardId, 10);
  const new_board = boards.find((board) => board.pk === boardId);

  const { post_length } = new_board;

  let lastPage = post_length / 10 + 1;
  lastPage = Math.floor(lastPage);

  return (
    <Pagination page={pageId} post_length={post_length} lastPage={lastPage} />
  );
};

export default withRouter(PaginationContainer);
