import React, { useState } from "react";
import styled from "styled-components";
import palatte from "../../lib/styles/palette";
import PostCommentToggle from "./PostCommentToggle";
// import { deleteComment } from "../../modules/comment";
import { deleteComment } from "../../lib/api/posts";
const CommentBlock = styled.span`
  display: inline-flex;
  width: 80%;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    width: 70%;
  }
  word-break: break-all;
`;
const Blank = styled.div`
  display: inline-flex;
  width: 9%;
  @media (max-width: 768px) {
    width: 3%;
  }
`;
const ActionButton = styled.button`
  display: inline-flex;
  @media (max-width: 768px) {
    width: 13%;
    font-size: 0.875rem;
  }
  width: 5%;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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
      margin-left: 0.1rem;
    }
  }
`;

const Input = styled.input`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  word-break: break-all;
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

const PostCommentItem = ({
  comment,
  user,
  onClickRe,
  recommentdata,
  onWriteRecomment,
  onReadComment,

  ownComment,
  onChangeComment,
  onChangeReComment,
  recommentList,
}) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [out, setOut] = useState(false);
  const { writeAt, content } = comment.fields;
  const { username } = comment.fields.author.fields;
  const { pk } = comment;


  //  const { content } = recommentList.fields;

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onRemoveComment = async () => {
    try {
      await deleteComment({ pk });
      setOut(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeComments = () => {
    const content = text;
    onChangeComment({ pk, content });
  };
  const onSumbit = (e) => {
    e.preventDefault();
    // 내용이 비어있을 경우 경고 표시
    if (text === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    onChangeComments();
    setText("");
    setEdit(!edit);
  };

  const ownThing = ownComment(username);
  const postDate = writeAt.split("T");
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
              <CommentBlock className="box">{content}</CommentBlock>
              {/* 댓글 user와 같은지 확인하여 수정 삭제 가능 불가능 결정 */}
              {ownThing ? (
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
                  <ActionButton onClick={onRemoveComment}>삭제</ActionButton>
                </>
              ) : (
                <div>&nbsp;&nbsp;</div>
              )}
            </>
          )}

          <PostCommentToggle
            comment={comment}
            onClickRe={onClickRe}
            recommentdata={recommentdata}
            onWriteRecomment={onWriteRecomment}
            onReadComment={onReadComment}
            user={user}
            recommentList={recommentList}
            onChangeReComment={onChangeReComment}
          />
          <br />
        </>
      )}
    </>
  );
};

export default React.memo(PostCommentItem);
