import React from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Responsive from './Responsive';

import Button from './Button';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 3;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const MenuList = styled(Link)`
  font-weight: 800;
  margin-right: 1rem;
`;

const BoardItem = ({ board }) => {
  const { name } = board.fields;
  const { post_length } = board;
  const number = post_length;

  return (
    <>
      <Link to={`/board/${board.pk}`}>{name}</Link>
    </>
  );
};
const Header = ({ user, onLogout, onClick, boards, data }) => {
  return (
    <>
      <HeaderBlock>
        {/* <Menu>
          <AiOutlineMenu
            className="menu"
            color="#22b8cf"
            onClick={onClick}
          ></AiOutlineMenu>
          <ul className="box">
            <h1>게시판</h1>
            {boards && (
              <ul>
                {data.map((board) => (
                  <BoardItem board={board} key={board.pk} />
                ))}
              </ul>
            )}
          </ul>
        </Menu> */}
        <Wrapper>
          <Link to="/" className="logo">
            REACTERS
          </Link>
          <MenuList to="/">FORUM</MenuList>
          <MenuList to="/login">BOARD</MenuList>
          <MenuList to="/board/1">Q&A</MenuList>

          {user ? (
            <div className="right">
              <UserInfo>{user}</UserInfo>
              <Button cyan onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button cyan to="/login">
                로그인
              </Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
