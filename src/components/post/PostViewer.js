import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
  span {
    font-size: 0.8rem;
  }
`;

const CommentHead = styled.div`
  font-size: 2rem;
  color: black;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SubInfoinPost = styled(SubInfo)`
  border: 1px solid ${palette.gray[2]};
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({
  post,
  error,
  loading,
  actionButtons,
  data,
  postId,
  postsdata,
  ownPost,
}) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    {
      console.log(error);
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !postsdata) {
    return null;
  }
  const new_id = postId - 1;
  const { title, content, writeAt } = postsdata[new_id].fields;
  const { reply_length } = postsdata[new_id];
  ownPost(postsdata[postId - 1].fields.author.fields.username);
  console.log('hi', postsdata[postId - 1].fields.author.fields.username);
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>제목 : {title}</h1>
        <SubInfoinPost publishedDate={writeAt} hasMarginTop />
        {/* <Tags tags={tags} /> */}
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: content }} />

      <PostHead />

      <PostHead>
        <span>댓글개수 : {reply_length}</span>
      </PostHead>
    </PostViewerBlock>
  );
};

export default PostViewer;
