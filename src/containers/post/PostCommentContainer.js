import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  readComment,
  unloadComment,
  readRecomment,
} from "../../modules/comment";
import PostCommentList from "../../components/post/PostCommentList";
import { withRouter } from "react-router-dom";
import {
  initialize,
  writeComment,
  writeReComment,
} from "../../modules/commentwrite";
const PostCommentContainer = ({ match }) => {
  const [check, onCheck] = useState(false);
  const { postId } = match.params;
  const { comment, data, user, content, pk, recommentdata } = useSelector(
    ({ comment, user, commentwrite }) => ({
      comment: comment.comment,
      data: comment.data,
      user: user.user,
      content: commentwrite.content,
      pk: postId,
      recommentdata: comment.recommentdata,
    })
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    dispatch(initialize());
    // 댓글 읽어오기
    dispatch(readComment(postId));
    return () => {
      dispatch(initialize());
      dispatch(unloadComment());
    };
  }, [dispatch, pk, content, postId]);
  const onReadComment = ({ id }) => {
    dispatch(readComment(id));
  };
  // 댓글 쓰기
  const onPublish = ({ content }) => {
    dispatch(writeComment({ pk, content }));
    //댓글 읽어오기
    const id = pk;
    dispatch(readComment(id));
    dispatch(readComment(id));
    dispatch(readComment(id));
  };
  const onWriteRecomment = ({ pk, content }) => {
    dispatch(writeReComment({ pk, content }));
    const id = pk;

    dispatch(readRecomment(id));
    dispatch(readRecomment(id));
    dispatch(readRecomment(id));
    dispatch(readComment(postId));
  };
  // 대댓글 읽어오기
  const onClickRe = ({ id }) => {
    dispatch(readRecomment(id));
    dispatch(readComment(id));
  };
  // // 댓글 삭제하기
  // let is = 'hihi';
  const onRemove = ({ pk }) => {
    console.log("댓글 삭제 pk:", pk);
    dispatch(deleteComment({ pk }));
  };

  const ownComment = (postId) => {
    if (postId === user) {
      onCheck(true);
      return true;
    }
  };

  return (
    <PostCommentList
      comment={comment}
      // onToggle={onToggle}
      onPublish={onPublish}
      onRemove={onRemove}
      postId={postId}
      data={data}
      user={user}
      onReadComment={onReadComment}
      recommentdata={recommentdata}
      onWriteRecomment={onWriteRecomment}
      onClickRe={onClickRe}
      ownComment={ownComment}
    ></PostCommentList>
  );
};

export default withRouter(PostCommentContainer);
