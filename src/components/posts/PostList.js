import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link, withRouter } from 'react-router-dom';
import { readPost } from '../../modules/post';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const BoardItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-right: 2rem;
    margin-top: 2rem;
  }
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-right: 2rem;
    margin-top: 2rem;
  }
`;

const SideBlock = styled.div`
  h1 {
    font-size: 1.5rem;
  }
  position: fixed;
  background-color: white;

  width: 10%;
  height: 100%;
  margin-left: 100px;
  margin-top: 70px;
`;

const BoardItem = ({ board }) => {
  const { name } = board.fields;
  const { post_length } = board;
  const number = post_length;

  return (
    <>
      <h2>
        <Link to={`/board/${board.pk}`}>{name}</Link>
      </h2>
      <SubInfo>{number}</SubInfo>
    </>
  );
};

const PostItem = ({ post }) => {
  const { reply_length } = post;
  const { email, username } = post.fields.author.fields;

  const { title, content, writeAt, board } = post.fields;

  const postDate = writeAt.split('T');

  return (
    <PostItemBlock>
      <h2>
        <Link to={`/board/post/${post.pk}`}>{title}</Link>
      </h2>

      <p>
        작성자 : {username} 작성일 {postDate[0]}
      </p>
      {/* <span>{content}</span> */}
      <br />
      <span>댓글 수 : {reply_length}</span>
    </PostItemBlock>
  );
};

const PostList = ({
  posts,
  boards,
  loading,
  error,
  showWriteButton,
  data,
  match,
  postsdata,
  postId,
  post,
}) => {
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }
  // if (postId === undefined) {
  //   return (postId = 1);
  // }
  const _postId = parseInt(localStorage.getItem('postId'));
  return (
    <BoardItemBlock>
      {/* <SideBlock>
        <h1>게시판 목록</h1>

        {!loading && boards && (
          <div>
            {data.map((board) => (
              <BoardItem board={board} key={board.pk} />
            ))}
          </div>
        )}
      </SideBlock> */}
      <PostListBlock>
        <WritePostButtonWrapper>
          {showWriteButton && postId ? (
            <Button cyan to={`/write/${postId}`}>
              새 글 작성하기
            </Button>
          ) : (
            <Button cyan to={`/write/${_postId}`}>
              새 글 작성하기
            </Button>
          )}
        </WritePostButtonWrapper>
        {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}

        {!loading && posts && (
          <div>
            {postsdata.map((post) => (
              <PostItem post={post} key={post.pk} />
            ))}
          </div>
        )}
      </PostListBlock>
    </BoardItemBlock>
  );
};

export default withRouter(PostList);
