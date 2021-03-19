import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";

const PostListContainer = ({ match }) => {
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
   let start, end;
   start = localStorage.getItem("start");
   end = localStorage.getItem("end");
   if (start === isNaN || end === isNaN) {
      localStorage.setItem("start", 0);
      localStorage.setItem("end", 10);
      console.log("hihi");
      start = 1;
      end = 10;
   } else {
      start = start.toString().replace(/"/g, "");
      end = end.toString().replace(/"/g, "");
   }
   useEffect(() => {
      let id = postId;

      localStorage.setItem("id", id);
      let diff = localStorage.getItem("id");
      diff = diff.toString().replace(/"/g, "");
      if (diff !== id) {
         localStorage.setItem("start", 0);
         localStorage.setItem("end", 10);
      }

      dispatch(listPosts({ id, start, end }));
   }, [dispatch, postId, end, start]);

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
