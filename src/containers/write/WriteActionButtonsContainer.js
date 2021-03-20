import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writePost, updatePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history, match, location }) => {
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
  const onPublish = (pk) => {
    if (title === "") {
      alert("빈 제목은 입력할 수 없습니다!");
      return;
    }
    if (content === "") {
      alert("내용이 비어 있습니다!");
      return;
    }
    localStorage.setItem("write_pk", pk);
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
      let page_pk = localStorage.getItem("write_pk");
      const _id = page_pk.toString().replace(/"/g, "");
      history.push(`/board/${_id}`);
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
