import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
   display: flex;
   flex-direction: row-reverse;
   margin-top: 1rem;
   margin-bottom: 3rem;
   white-space: nowrap;
   button + button {
      margin-right: 0.5rem;
   }
   :last-child {
      padding-right: 1rem;
   }
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
   height: 2.125rem;
   & + & {
      margin-left: 0.5rem;
   }
`;

const WriteActionButtons = ({
   onCancel,
   onPublish,
   onUpdatePost,
   originalPostId,
   pk,
}) => {
   const onPublishPost = () => {
      let post_pk = localStorage.getItem("id");
      let local_pk = post_pk.toString().replace(/"/g, "");
      onPublish(local_pk);
   };
   return (
      <WriteActionButtonsBlock>
         <StyledButton onClick={onCancel}>취소</StyledButton>
         {!originalPostId ? (
            <StyledButton cyan onClick={onPublishPost}>
               포스트 등록
            </StyledButton>
         ) : (
            <StyledButton cyan onClick={() => onUpdatePost({ pk })}>
               포스트 수정
            </StyledButton>
         )}
      </WriteActionButtonsBlock>
   );
};

export default WriteActionButtons;
