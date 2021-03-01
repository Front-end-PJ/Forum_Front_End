import React, { useState } from 'react';
import styled from 'styled-components';
import PostCommentItem from './PostCommentItem';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import { stringify } from 'qs';
const Input = styled.input`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.cyan[5]};
  &:hover {
    background: ${palette.cyan[4]};
  }
  float: right;
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
`;

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostCommentList = ({
  user,
  comment,
  data,
  onPublish,
  onRemove,
  onClickRe,
  recommentdata,
  onWriteRecomment,
  onReadComment,
  ownComment,
}) => {
  const [content, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();

    onPublish({ content });
    setText('');
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <PostViewerBlock>
      <PostHead>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            value={content}
            placeholder="댓글을 입력하세요"
            onChange={onChange}
          />
          <Button cyan type={'submit'}>
            등록
          </Button>
        </form>
        <br />
        <br />

        <div>
          {console.log('data: ', data)}
          {data.map((comment) => (
            <PostCommentItem
              key={comment.pk}
              comment={comment}
              onRemove={onRemove}
              onClickRe={onClickRe}
              recommentdata={recommentdata}
              onWriteRecomment={onWriteRecomment}
              onReadComment={onReadComment}
              ownComment={ownComment}
              user={user}
            ></PostCommentItem>
          ))}
        </div>
      </PostHead>
    </PostViewerBlock>
  );
};

export default PostCommentList;
