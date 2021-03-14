import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writePost, updatePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history, match }) => {
  const dispatch = useDispatch();
  const { title, content, pk, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      pk: write.pk,
      content: write.content,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    })
  );

  // 포스트 등록
  const onPublish = () => {
    dispatch(
      writePost({
        title,
        pk,
        content,
      })
    );
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      history.push(`/`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);
  const onUpdatePost = ({ pk }) => {
    dispatch(updatePost({ pk, content }));
  };
  return (
    <WriteActionButtons
      pk={pk}
      originalPostId={originalPostId}
      onPublish={onPublish}
      onCancel={onCancel}
      onUpdatePost={onUpdatePost}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
