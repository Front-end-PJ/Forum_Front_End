import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
const RecommentBlock = styled.div``;

const ReCommentBlock = styled.span`
  display: flex;
  justify-content: flex-start;

  div {
    display: flex;
    justify-content: flex-end;

    margin-top: -1.5rem;
    width: 100%;
    margin-bottom: 2rem;
  }
`;
const Button = styled.button`
  border: none;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 2rem;
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
`;
const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

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

const PostRecommentItem = ({ recomment, onRecomment, user }) => {
  const { id } = recomment;
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSumbit = (e) => {
    e.preventDefault();
    // 내용이 비어있을 경우 경고 표시
    if (text === '') {
      alert('내용을 입력해주세요!');
      return;
    }

    setText('');
    setEdit(!edit);
  };
  // username 불러오기
  const { username } = recomment.fields.author.fields;
  // 자신이 쓴 대댓글인지 확인
  const ownRecomment = user === username;
  console.log('this is own', ownRecomment);
  const { writeAt, content } = recomment.fields;
  const postDate = writeAt.split('T');
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   onRecomment(id, text);
  //   setText('');
  // };
  return (
    <>
      {console.log(recomment)}
      {/* <AiOutlineArrowRight className="box"></AiOutlineArrowRight> */}
      <div>
        {/* 댓글 정보 */}
        <span>
          Date: {postDate[0]} username: {username}
        </span>
        <hr />
        {/* 댓글 수정 부 form 으로 구현  */}
        {edit && (
          <form onSubmit={onSumbit}>
            <Input value={text} onChange={onChange}></Input>
            <ReCommentBlock>
              <ActionButton type={'submit'}>등록</ActionButton>
              <ActionButton>취소</ActionButton>
            </ReCommentBlock>
          </form>
        )}
        {edit || (
          <div>
            <ReCommentBlock>{content}</ReCommentBlock>
            {/* 댓글 user와 같은지 확인하여 수정 삭제 가능 불가능 결정 */}
            {ownRecomment ? (
              <>
                <ReCommentBlock>
                  <div>
                    <ActionButton
                      onClick={() => {
                        setEdit(!edit);
                      }}
                    >
                      수정
                    </ActionButton>
                    <ActionButton>삭제</ActionButton>
                  </div>
                </ReCommentBlock>
              </>
            ) : (
              <div>&nbsp;&nbsp;</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostRecommentItem;
