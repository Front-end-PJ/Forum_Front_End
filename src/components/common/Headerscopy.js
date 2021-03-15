import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import Responsive from "./Responsive";

const HaderBlock = styled.div`
  //clearfix
  .clearfix::after {
    content: "";
    clear: both;
    display: block;
  }

  .float--left {
    float: left;
  }

  .float--right {
    float: right;
  }

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    .float--left,
    .float--right {
      float: none;
    }
    display: block;
  }
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: none;
    /* 초기화 */
    height: auto;
    padding: 0 20px;
  }
`;
const MenuGroup = styled.div`
  @media (max-width: 768px) {
    display: block;
    margin-top: 0.5rem;
    margin-left: 0;
  }

  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    @media (max-width: 768px) {
      display: flex;
      width: 7rem;
    }
    display: flex;
    align-content: center;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  #toggle-btn {
    display: none;
    font-size: 1.5rem;
    position: absolute;
    top: 0.55rem;
    right: 1rem;
    cursor: pointer;
    text-indent: -9999px;
    @media (max-width: 768px) {
      display: block;
    }
  }
  .main-menu {
    display: flex;
    font-size: 1.125rem;
    font-weight: 800;
    align-content: center;

    @media (max-width: 768px) {
      display: block;
    }
  }

  .main-menu .myLink {
    @media (max-width: 768px) {
      display: block;
      margin-left: 0;
      box-sizing: border-box;
      margin: 0.5rem;
      :first-child {
        border-top: 1px solid #e5e5e5;
      }
      border-bottom: 1px solid #e5e5e5;
    }
    display: flex;
    padding: 10px;
    color: #3c4146;
  }

  .btn {
    order: 1;
    justify-content: center;
    @media (max-width: 768px) {
      text-align: center;
      box-sizing: border-box;
      margin: 0.5rem;
      display: block;
      justify-self: center;
    }
  }
  @media (max-width: 768px) {
    .toggle {
      display: none;
    }
    .toggle.on {
      display: block;
    }
  }
`;

const Headers = ({ user, onLogout, boards }) => {
  const $toggles = document.querySelectorAll(".toggle"); //NodeList
  const $toggleBtn = document.getElementById("toggle-btn");

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
  return (
    <HaderBlock>
      <Wrapper className="clearfix">
        <MenuGroup className="float--left">
          <Link style={{ display: "flex" }} to="/" className="logo" replace>
            REACTERS
          </Link>
          <GiHamburgerMenu
            onClick={toggleElements}
            id="toggle-btn"
          ></GiHamburgerMenu>
          <div class="main-menu toggle">
            {boards_data && (
              <div className="main-menu">
                {boards_data.map((board) => (
                  <Link
                    to={`/board/${board.pk}`}
                    className="myLink"
                    key={board.pk}
                    rep
                    lace
                  >
                    {board.fields.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </MenuGroup>
        <MenuGroup className="float--right toggle">
          {user ? (
            <div className="hi">
              {/* <UserInfo className="toggle">{user}</UserInfo> */}
              <Button className="toggle btn" cyan onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="hi">
              <Button className="toggle btn" cyan to="/login">
                로그인
              </Button>
            </div>
          )}
        </MenuGroup>
      </Wrapper>
    </HaderBlock>
  );
};

export default Headers;
