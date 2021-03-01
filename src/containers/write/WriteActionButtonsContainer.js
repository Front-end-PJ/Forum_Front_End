import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history, match }) => {
  const { postId } = match.params;
  console.log(('id aaaa', postId));
  const dispatch = useDispatch();
  const {
    title,
    content,
    tags,
    pk,
    post,
    postError,
    originalPostId,
  } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    pk: 1,
    originalPostId: write.originalPostId,
  }));

  // 포스트 등록
  const onPublish = () => {
    // if (originalPostId) {
    //   dispatch(updatePost({ title, content, tags, id: originalPostId }));
    //   return;
    // }
    dispatch(
      writePost({
        title,
        pk,
        content,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      console.log('포스트', post);
      console.log('크기', post.data);
      const { _id, user } = post;
      console.log(_id);
      history.push(`/`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
