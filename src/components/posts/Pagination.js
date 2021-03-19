import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  padding-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, onClickNext, onClickPrev }) => {
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
