import React, { useState } from "react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import PostRecommentItem from "./PostRecommentItem";
const ToggleButton = styled.div`
  display: block;
  align-items: center;

  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  span {
    position: absolute;
    top: 0;
    left: 1.7rem;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 2px;
  }
  p {
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    display: hidden;
  }
`;

const Input = styled.input`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
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
  margin-bottom: 1rem;
  cursor: pointer;
  background: ${palette.cyan[5]};
  &:hover {
    background: ${palette.cyan[4]};
  }
  float: right;
`;
const Button2 = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  width: 100%;
  color: white;
  margin-bottom: 2rem;
  outline: none;
  cursor: pointer;
  background: ${palette.cyan[5]};
  &:hover {
    background: ${palette.cyan[4]};
  }
`;
const RecommentBlock = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.02);
  background-color: rgba(0, 0, 0, 0.016);
  padding: 1.5rem;
  border-radius: 10px;
`;

const PostCommentToggle = ({
  comment,
  onRecomment,
  onClickRe,
  recommentdata,
  onWriteRecomment,
  onReadComment,
  onChangeReComment,
  user,
}) => {
  const { pk } = comment;
  const { answer_reply_length } = comment;
  let recommnet_datas;
  if (answer_reply_length !== 0) {
    recommnet_datas = comment.recomment_data;
  }

  // const { id } = comment.recomments;
  const [set, onSet] = useState(false);
  const [setRe, onSetRe] = useState(false);
  const [text, setText] = useState("");

  const onSubmitRe = (e) => {
    e.preventDefault();
    const content = text;
    onWriteRecomment({ pk, content });
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClick = () => {
    onSet(!set);
    let id = pk;
    onClickRe(id);
  };
  const onClick2 = () => {
    onSetRe(!setRe);
  };

  const onRead = () => {
    let id = pk;
    onReadComment({ id });
  };

  return (
    <>
      <>
        <ToggleButton>
          {set ? (
            <AiOutlineMinusSquare
              onClick={onClick}
              color="#22b8cf"
            ></AiOutlineMinusSquare>
          ) : (
            <AiOutlinePlusSquare
              onClick={onClick}
              color="#22b8cf"
            ></AiOutlinePlusSquare>
          )}

          {set ? (
            <span onClick={onClick}>숨기기</span>
          ) : (
            <div>
              {answer_reply_length === 0 ? (
                <span onClick={onClick}>답글 달기</span>
              ) : (
                <span onClick={onClick}>{answer_reply_length}개의 댓글</span>
              )}
            </div>
          )}
        </ToggleButton>
      </>
      <br />
      {set && answer_reply_length === 0 ? (
        <form onSubmit={onSubmitRe}>
          <Input
            type="text"
            value={text}
            placeholder="답글을 입력하세요"
            onChange={onChange}
          ></Input>
          <Button type={"submit"} onClick={onRead}>
            등록
          </Button>
          <br />
          <br />
        </form>
      ) : null}
      {set && answer_reply_length !== 0 && (
        <>
          <RecommentBlock>
            {recommnet_datas.map((recomment) => (
              <PostRecommentItem
                key={recomment.pk}
                recomment={recomment}
                user={user}
                onChangeReComment={onChangeReComment}
              ></PostRecommentItem>
            ))}
          </RecommentBlock>
          {user && (
            <Button2 onClick={onClick2}>
              {setRe ? "숨기기" : "답글달기"}
            </Button2>
          )}
          {setRe && (
            <form onSubmit={onSubmitRe}>
              <Input
                type="text"
                value={text}
                placeholder="답글을 입력하세요"
                onChange={onChange}
              ></Input>
              <Button type={"submit"}>등록</Button>
              <br />
            </form>
          )}
        </>
      )}
    </>
  );
};
export default PostCommentToggle;
