import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { listPosts } from "../../modules/posts";
const PaginationBlock = styled.div`
   width: 320px;
   margin: 0 auto;
   display: flex;
   justify-content: space-between;
   margin-bottom: 5rem;
   padding-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ page }) => {
   const query = qs.stringify({ page });
   let id = localStorage.getItem("id");
   id = id.toString().replace(/"/g, "");
   return `/board/${id}/${query}`;
};

const Pagination = ({ page, lastPage }) => {
   const dispatch = useDispatch();
   let start = localStorage.getItem("start");
   let end = localStorage.getItem("end");
   start = start.toString().replace(/"/g, "");
   start = parseInt(start, 10);
   end = end.toString().replace(/"/g, "");
   end = parseInt(end, 10);
   let id = localStorage.getItem("id");
   id = id.toString().replace(/"/g, "");
   const onClickNext = () => {
      start = start + 10;
      end = end + 10;
      localStorage.setItem("start", start);
      localStorage.setItem("end", end);
      dispatch(listPosts({ id, start, end }));
   };
   const onClickPrev = () => {
      start = start - 10;
      end = end - 10;
      localStorage.setItem("start", start);
      localStorage.setItem("end", end);
      dispatch(listPosts({ id, start, end }));
   };
   return (
      <PaginationBlock>
         <Button
            onClick={onClickPrev}
            disabled={page === 1}
            to={page === 1 ? undefined : buildLink({ page: page - 1 })}
         >
            이전
         </Button>
         <PageNumber>{page}</PageNumber>
         <Button
            onClick={onClickNext}
            disabled={page === lastPage}
            to={page === lastPage ? undefined : buildLink({ page: page + 1 })}
         >
            다음
         </Button>
      </PaginationBlock>
   );
};

export default Pagination;
