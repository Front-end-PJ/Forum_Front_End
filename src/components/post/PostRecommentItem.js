import React, { useState } from "react";
import styled from "styled-components";
import { deleteRecomment } from "../../lib/api/posts";
import palatte from "../../lib/styles/palette";

const ReCommentBlock = styled.span`
  display: inline-flex;
  width: 80%;

  white-space: normal;
  hr {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 56%;
  }
  word-break: break-all;
`;
const Blank = styled.div`
  display: inline-flex;
  width: 7%;
  @media (max-width: 768px) {
    width: 3%;
  }
`;
const ActionButton = styled.button`
  display: inline-flex;
  @media (max-width: 768px) {
    width: 20%;
    font-size: 0.765rem;
    padding: 0.2rem 0;
  }
  width: 6%;
  /* padding: 0.25rem 0.5rem; */
  border-radius: 4px;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  color: ${palatte.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palatte.gray[1]};
    color: ${palatte.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
    @media (max-width: 768px) {
      margin-left: 0.05rem;
    }
  }
`;

const Input = styled.input`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  /* margin-bottom: 1.5rem; */
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  padding-bottom: -1rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
`;

const PostRecommentItem = ({
  recomment,
  onRecomment,
  user,
  onChangeReComment,
}) => {
  const { reply } = recomment.fields;
  // username 불러오기
  const { username } = recomment.fields.author.fields;
  const { pk } = recomment;
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [out, setOut] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSumbit = (e) => {
    e.preventDefault();
    // 내용이 비어있을 경우 경고 표시
    if (text === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    const content = text;
    const recomment_pk = reply;
    onChangeReComment({ pk, content, recomment_pk });
    setText("");
    setEdit(!edit);
  };

  // 자신이 쓴 대댓글인지 확인
  const ownRecomment = user === username;

  const { writeAt, content } = recomment.fields;
  const postDate = writeAt.split("T");
  // 대댓글 삭제
  const onRemove = async () => {
    try {
      deleteRecomment({ pk });
      setOut(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {out || (
        <>
          {/* 댓글 정보 */}
          <div>
            Date: {postDate[0]} username: {username}
          </div>
          <hr />
          {/* 댓글 수정 부 form 으로 구현  */}
          {edit && (
            <form onSubmit={onSumbit}>
              <Input value={text} onChange={onChange}></Input>
              <>
                <ActionButton type={"submit"}>등록</ActionButton>
                <ActionButton onClick={() => setEdit(!edit)}>취소</ActionButton>
              </>
            </form>
          )}
          {edit || (
            <>
              <ReCommentBlock className="content">{content}</ReCommentBlock>
              {/* 댓글 user와 같은지 확인하여 수정 삭제 가능 불가능 결정 */}
              {ownRecomment ? (
                <>
                  <Blank>&nbsp;</Blank>
                  <ActionButton
                    onClick={() => {
                      setEdit(!edit);
                      setText(content);
                    }}
                  >
                    수정
                  </ActionButton>
                  <ActionButton onClick={onRemove}>삭제</ActionButton>
                </>
              ) : (
                <div>&nbsp;&nbsp;</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostRecommentItem;
