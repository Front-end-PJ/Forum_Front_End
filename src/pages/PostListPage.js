import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer";
import SideContainer from "../containers/common/SideContainer";

const PostListPage = () => {
   return (
      <>
         <HeaderContainer />

         <PostListContainer />
         <PaginationContainer />
      </>
   );
};

export default PostListPage;
