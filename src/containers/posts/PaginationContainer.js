import React from "react";
import Pagination from "../../components/posts/Pagination";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "qs";

const PaginationContainer = ({ location }) => {
   const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
      lastPage: posts.lastPage,
      start: posts.start,
      end: posts.end,
      posts: posts.posts,
      loading: loading["posts/LIST_POSTS"],
   }));

   // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
   if (!posts || loading) return null;

   // page가 없으면 1을 기본값으로 사용
   const { page = 1 } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
   });

   let page_num = parseInt(page, 10);

   let end = localStorage.getItem("end");

   if (end !== null) {
      end = end.toString().replace(/"/g, "");
   }
   // 마지막 페이지 넘버와 저장된 페이지 넘버가 같지 않을경우 페이지 넘어갔다고 인식
   if (end !== page_num * 10) {
      localStorage.setItem("start", (page_num - 1) * 10 + 1);
      localStorage.setItem("end", page_num * 10);
   }

   return <Pagination page={page_num} lastPage={lastPage} />;
};

export default withRouter(PaginationContainer);
