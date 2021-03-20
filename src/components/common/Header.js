import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";

const HeaderBlock = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

  #toggle {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
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
  #menu_btn {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    @media (max-width: 768px) {
      display: flex;
    }
  }
  .toggle.on {
    display: inline-block;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  font-weight: 800;
  margin-right: 1rem;
`;

const MenuList = styled(Link)`
  font-weight: 800;
  margin-right: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const BoardList = styled.div`
  .dropbtn {
    background-color: #ea2129;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }

  .dropdown {
    @media (max-width: 768px) {
      display: none;
    }
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    margin-left: -1rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content .myLink {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content .myLink:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
`;

const Header = ({ user, onLogout, boards }) => {
  const $toggles = document.querySelectorAll(".toggle"); //NodeList

  function toggleElements() {
    [].forEach.call($toggles, function (toggle) {
      toggle.classList.toggle("on");
    });
  }
  let boards_data = boards && boards;
  if (boards !== null) {
    localStorage.setItem("boards", JSON.stringify(boards));
  } else {
    boards_data = JSON.parse(localStorage.getItem("boards"));
  }
  function onClick() {
    localStorage.setItem("start", 0);
    localStorage.setItem("end", 10);
    console.log("askldjflasd;kf");
  }
  let id = 1;
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            REACTERS
          </Link>
          {/* 메뉴 리스트 */}
          <BoardList>
            <MenuList className="dropdown toggle">
              <p>BoardList</p>
              <div class="dropdown-content">
                {boards_data && (
                  <div>
                    {boards_data.map((board) => (
                      <Link
                        to={`/board/${board.pk}/post/${id}`}
                        className="myLink"
                        key={board.pk}
                        replace
                      >
                        {board.fields.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </MenuList>
          </BoardList>

          {/* 로그인, 로그아웃 버튼 */}
          {user ? (
            <div className="toggle">
              <UserInfo className="toggle">{user}</UserInfo>
              <Button cyan onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="toggle">
              <Button cyan to="/login">
                로그인
              </Button>
            </div>
          )}

          <GiHamburgerMenu
            onClick={toggleElements}
            id="menu_btn"
          ></GiHamburgerMenu>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
