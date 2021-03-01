import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
// 페이지 레이아웃 담당

// 화면 전체 채움
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  //flex로 내부 중앙 정렬
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 흰색 박스
const WitheBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WitheBox>
        <div className="logo-area">
          <Link to="/board/1">REACTERS</Link>
        </div>
        {children}
      </WitheBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
