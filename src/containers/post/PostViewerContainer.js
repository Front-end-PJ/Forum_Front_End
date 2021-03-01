import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const [check, onCheck] = useState(false);
  const { postId } = match.params;
  const dispatch = useDispatch();
  const {
    post,
    error,
    loading,
    user,
    comment,
    data,
    _postId,
    postsdata,
  } = useSelector(({ post, loading, user, posts }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user,
    data: post.data,
    _postId: post._postId,
    postsdata: posts.postsdata,
  }));

  useEffect(() => {
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, _postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);

      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (PostId) => {
    if (PostId === user) {
      onCheck(true);
    }
  };

  // const ownPost = (user) === (post && postsdata.user._id);
  // const ownComment = (user && user._id) === (post && post.user_id);

  return (
    <>
      <PostViewer
        post={post}
        loading={loading}
        error={error}
        data={data}
        postId={postId}
        postsdata={postsdata}
        ownPost={ownPost}
        actionButtons={
          <PostActionButtons
            onEdit={onEdit}
            onRemove={onRemove}
            check={check}
          />
        }
      />
    </>
  );
};

export default withRouter(PostViewerContainer);
