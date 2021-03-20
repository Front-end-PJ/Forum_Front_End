import React, { useState } from "react";
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
  z-index: 3;
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
    font-size: 1rem;
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
    margin-left: 7rem;
    display: flex;

    padding: 10px;
    color: #3c4146;
  }

  .btn {
    order: 2;
    justify-content: center;
    @media (max-width: 768px) {
      text-align: center;
      box-sizing: border-box;
      margin: 0.5rem;
      display: block;
      justify-self: center;
    }
  }
  .username {
    order: 1;
    font-weight: 800;
    margin-right: 1.5rem;
    justify-content: center;
    p {
      display: none;
    }
    @media (max-width: 768px) {
      margin-left: 1.5rem;
      p {
        display: inline;
      }
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
  const [check, onCheck] = useState(false);

  const $toggles = document.querySelectorAll(".toggle"); //NodeList

  function toggleElements() {
    [].forEach.call($toggles, function (toggle) {
      toggle.classList.toggle("on");
    });
  }

  async function get() {
    try {
      onLogout();
      const toggles2 = document.getElementById(".log");
      console.log("select", toggles2);
      toggles2.classList.toggle("on");
      onCheck(true);
    } catch (e) {
      console.log(e);
    }
  }
  if (check) {
    const toggles2 = document.getElementById(".log");
    console.log("select", toggles2);
    toggles2.classList.toggle("on");
    onCheck(false);
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
    <HaderBlock>
      <Wrapper className="clearfix">
        <MenuGroup className="float--left">
          <Link style={{ display: "flex" }} to="/" className="logo" replace>
            C&D
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
                    onClick={onClick}
                    to={`/board/${board.pk}/page=${id}`}
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
        <MenuGroup className="float--right">
          {user ? (
            <>
              <div className="toggle username">
                <p>ID : </p>
                {user}
              </div>
              <Button className="toggle btn" cyan onClick={get}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button className="toggle btn" id="log" cyan to="/login">
              로그인
            </Button>
          )}
        </MenuGroup>
      </Wrapper>
    </HaderBlock>
  );
};

export default Headers;
