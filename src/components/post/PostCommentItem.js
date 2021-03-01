import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, Redirect } from "react-dom";
import palatte from "../../lib/styles/palette";
import PostCommentToggle from "./PostCommentToggle";
// import { deleteComment } from "../../modules/comment";
import { deleteComment } from "../../lib/api/posts";
const CommentBlock = styled.span`
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
const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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

const PostCommentItem = ({
  comment,
  onRemove,
  user,
  onClickRe,
  recommentdata,
  onWriteRecomment,
  onReadComment,
  ownComment,
  history,
}) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [out, setOut] = useState(false);
  console.log("comment", comment);
  const { post } = comment.fields;
  const { pk } = comment;
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
  // const onRemoveComment = (async) => {
  //   console.log("pk값은", pk);
  // };
  const onSumbit = (e) => {
    e.preventDefault();
    // 내용이 비어있을 경우 경고 표시
    if (text === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    setText("");
    setEdit(!edit);
  };

  const { username } = comment.fields.author.fields;
  const ownThing = ownComment(username);

  const { writeAt, content } = comment.fields;

  const postDate = writeAt.split("T");
  return (
    <>
      {out || (
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
              <CommentBlock>
                <div>
                  <ActionButton type={"submit"}>등록</ActionButton>
                  <ActionButton>취소</ActionButton>
                </div>
              </CommentBlock>
            </form>
          )}
          {edit || (
            <div>
              <CommentBlock>{content}</CommentBlock>
              {/* 댓글 user와 같은지 확인하여 수정 삭제 가능 불가능 결정 */}
              {ownThing ? (
                <>
                  <CommentBlock>
                    <div>
                      <ActionButton
                        onClick={() => {
                          setEdit(!edit);
                        }}
                      >
                        수정
                      </ActionButton>
                      <ActionButton onClick={onRemoveComment}>
                        삭제
                      </ActionButton>
                    </div>
                  </CommentBlock>
                </>
              ) : (
                <div>&nbsp;&nbsp;</div>
              )}
            </div>
          )}

          <PostCommentToggle
            comment={comment}
            onClickRe={onClickRe}
            recommentdata={recommentdata}
            onWriteRecomment={onWriteRecomment}
            onReadComment={onReadComment}
            user={user}
          />
          <br />
        </div>
      )}
    </>
  );
};

export default PostCommentItem;
