import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import PostCommentContainer from "../containers/post/PostCommentContainer";

import PostViewerContainer from "../containers/post/PostViewerContainer";

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
      <PostCommentContainer />
    </>
  );
};

export default PostPage;
