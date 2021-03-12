import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { unloadPost } from "../../modules/post";
import PostViewer from "../../components/post/PostViewer";
import PostActionButtons from "../../components/post/PostActionButtons";
import { setOriginalPost } from "../../modules/write";
import { deletePost } from "../../lib/api/posts";

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
    data,
    _postId,

    postsdata,
  } = useSelector(({ post, loading, user, posts, write }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ_POST"],
    user: user.user,
    data: post.data,
    _postId: post._postId,
    title: write.title,
    pk: write.pk,
    content: write.content,
    originalPostId: write.originalPostId,
    postsdata: posts.postsdata,
  }));

  useEffect(() => {
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, _postId]);

  const onEdit = ({ title, pk, content, originalPostId }) => {
    dispatch(setOriginalPost({ title, pk, content, originalPostId }));
    history.push("/write");
  };
  // 게시물 삭제
  const onRemove = async () => {
    try {
      let pk = postId;
      await deletePost({ pk });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  // 수정 삭제 (id 확인)
  const ownPost = (PostId) => {
    if (PostId === user) {
      onCheck(true);
    }
  };

  return (
    <>
      <PostViewer
        post={post}
        postsdata={postsdata}
        loading={loading}
        error={error}
        data={data}
        postId={postId}
        ownPost={ownPost}
        actionButtons={
          <PostActionButtons
            postsdata={postsdata}
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
