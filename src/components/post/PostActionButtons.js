import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palatte from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';

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
const PostActionButtons = ({ onEdit, onRemove, check }) => {
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

  return (
    <>
      {console.log('hihihi', check)}
      {check && (
        <>
          <PostActionButtonBlock>
            <ActionButton onClick={onEdit}>수정</ActionButton>
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

export default PostActionButtons;
