import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";

const PostListContainer = ({ match, history }) => {
   let { postId } = match.params;
   const dispatch = useDispatch();
   const { posts, error, loading, user, data, post, postsdata } = useSelector(
      ({ posts, loading, user, post }) => ({
         posts: posts.posts,
         error: posts.error,
         loading: loading["posts/READ_BOARD"],
         user: user.user,
         data: posts.data,
         boards: posts.boards,
         post: post.post,

         postsdata: posts.postsdata,
      })
   );
   // 각 게시판 별 게시물들 불러오기

   if (postId === undefined) {
      postId = 1;
   }
   useEffect(() => {
      let id = postId;
      let start = localStorage.getItem("start");
      let end = localStorage.getItem("end");

      if (start === null || end === null) {
         localStorage.setItem("start", 0);
         localStorage.setItem("end", 10);
         start = 0;
         end = 10;
      } else {
         start = start.toString().replace(/"/g, "");
         end = end.toString().replace(/"/g, "");
      }
      console.log("start, end", start, end);
      dispatch(listPosts({ id, start, end }));
   }, [dispatch, postId]);

   if (postId) {
      try {
         localStorage.setItem("postId", JSON.stringify(postId));
      } catch (e) {
         console.log("localStorage is not working");
      }
   }
   return (
      <PostList
         postId={postId}
         loading={loading}
         error={error}
         posts={posts}
         data={data}
         post={post}
         user={user}
         postsdata={postsdata}
         showWriteButton={user}
      />
   );
};

export default withRouter(PostListContainer);
