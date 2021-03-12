import React, { useState } from "react";
import styled from "styled-components";
import palatte from "../../lib/styles/palette";
import AskRemoveModal from "./AskRemoveModal";
import { withRouter } from "react-router-dom";
const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.div`
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
const PostActionButtons = ({ onEdit, onRemove, check, postsdata, match }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancle = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };
  const { postId } = match.params;

  let new_data =
    postsdata &&
    postsdata.find((x) => {
      return x.pk === parseInt(postId, 10);
    });
  if (postsdata !== null) {
    localStorage.setItem("postdata", JSON.stringify(new_data));
  } else {
    new_data = JSON.parse(localStorage.getItem("postdata"));
  }

  const { title, content } = new_data.fields;
  const { pk } = new_data;
  const { username } = new_data.fields.author.fields;
  const originalPostId = username;

  const onEditThing = () => {
    onEdit({ title, pk, content, originalPostId });
  };

  return (
    <>
      {check && (
        <>
          <PostActionButtonBlock>
            <ActionButton onClick={onEditThing}>수정</ActionButton>
            <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
          </PostActionButtonBlock>
          <AskRemoveModal
            visible={modal}
            onConfirm={onConfirm}
            onCancle={onCancle}
          ></AskRemoveModal>
        </>
      )}
    </>
  );
};

export default withRouter(PostActionButtons);
