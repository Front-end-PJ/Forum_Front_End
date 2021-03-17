import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  readComment,
  unloadComment,
  readRecomment,
  changeComment,
  changeReComment,
} from "../../modules/comment";
import PostCommentList from "../../components/post/PostCommentList";
import { withRouter } from "react-router-dom";
import {
  initialize,
  writeComment,
  writeReComment,
} from "../../modules/commentwrite";

const PostCommentContainer = ({ match }) => {
  const { postId } = match.params;
  const {
    comment,
    data,
    user,
    content,
    pk,
    recommentdata,
    recommentList,
  } = useSelector(({ comment, user, commentwrite }) => ({
    comment: comment.comment,
    data: comment.data,
    user: user.user,
    content: commentwrite.content,
    pk: postId,
    recommentdata: comment.recommentdata,
    recommentList: comment.recommentList,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    dispatch(initialize());
    // 댓글 읽어오기
    dispatch(readComment(postId));
    return () => {
      // dispatch(clearRecomments());
      dispatch(initialize());
      dispatch(unloadComment());
    };
  }, [dispatch, pk, content, postId]);
  // 댓글 읽어오기
  const onReadComment = useCallback(
    ({ id }) => {
      dispatch(readComment(id));
      // dispatch(readRecomment(id));
      // //여기서 해주면
      // dispatch(readRecomment(id));
    },
    [dispatch]
  );
  // 대댓글 읽어오기
  const onClickRe = useCallback(
    (id) => {
      dispatch(readRecomment(id));
      // dispatch(readRecomment(id));
    },
    [dispatch]
  );
  // 댓글 쓰기
  const onPublish = useCallback(
    ({ content }) => {
      dispatch(writeComment({ pk, content }));
      //댓글 읽어오기
      const id = pk;
      dispatch(readComment(id));
      dispatch(readComment(id));
      dispatch(readComment(id));
    },
    [dispatch, pk]
  );
  // 대댓글 쓰기
  const onWriteRecomment = useCallback(
    ({ pk, content }) => {
      dispatch(writeReComment({ pk, content }));
      const id = pk;
      dispatch(readComment(postId));
      dispatch(readRecomment(id));
      dispatch(readRecomment(id));
      dispatch(readRecomment(id));
    },
    [dispatch, postId]
  );
  // // 댓글 삭제하기
  // let is = 'hihi';
  const onRemove = useCallback(
    ({ pk }) => {
      dispatch(deleteComment({ pk }));
    },
    [dispatch]
  );
  // 작성자 게시물 확인하기
  const ownComment = useCallback(
    (postId) => {
      if (postId === user) {
        return true;
      }
    },
    [user]
  );
  // 댓글 수정하기
  const onChangeComment = useCallback(
    ({ pk, content }) => {
      dispatch(changeComment({ pk, content }));
      dispatch(readComment(postId));
      dispatch(readComment(postId));
    },
    [dispatch, postId]
  );
  // 대댓글 수정하기
  const onChangeReComment = useCallback(
    ({ pk, content, recomment_pk }) => {
      dispatch(changeReComment({ pk, content }));
      dispatch(readRecomment(recomment_pk));
      dispatch(readRecomment(recomment_pk));
    },
    [dispatch]
  );
  let number = 0;
  return (
    <PostCommentList
      comment={comment}
      onPublish={onPublish}
      onRemove={onRemove}
      postId={postId}
      number={number}
      data={data}
      user={user}
      onReadComment={onReadComment}
      recommentdata={recommentdata}
      onWriteRecomment={onWriteRecomment}
      onClickRe={onClickRe}
      ownComment={ownComment}
      onChangeComment={onChangeComment}
      onChangeReComment={onChangeReComment}
      recommentList={recommentList}
    >
      {(number += 1)}
    </PostCommentList>
  );
};

export default withRouter(PostCommentContainer);
