import React, { useEffect, useCallback } from "react";
import Editor from "../../components/write/Editor";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeField, initialize } from "../../modules/write";

const EditorContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { title, content } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
  }));
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );
  // 언마운트될 때 초기화
  useEffect(() => {
    let post_pk = localStorage.getItem("postId");

    post_pk = match.params;
    if (post_pk === undefined) post_pk = 1;

    return () => {
      dispatch(initialize());
    };
  }, [dispatch, match.params]);
  return (
    <Editor onChangeField={onChangeField} title={title} content={content} />
  );
};

export default withRouter(EditorContainer);
