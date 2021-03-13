import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";

import Button from "./Button";

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

const BoardList = styled.div`
   .dropbtn {
      background-color: #ea2129;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
   }

   .dropdown {
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
   let boards_data = boards && boards;
   if (boards !== null) {
      localStorage.setItem("boards", JSON.stringify(boards));
   } else {
      boards_data = JSON.parse(localStorage.getItem("boards"));
   }

   return (
      <>
         <HeaderBlock>
            <Wrapper>
               <Link to="/" className="logo">
                  REACTERS
               </Link>
               <BoardList>
                  <MenuList className="dropdown">
                     <p>BoardList</p>
                     <div class="dropdown-content">
                        {boards_data && (
                           <div>
                              {boards_data.map((board) => (
                                 <Link
                                    to={`/board/${board.pk}`}
                                    className="myLink"
                                    key={board.pk}
                                 >
                                    {board.fields.name}
                                 </Link>
                              ))}
                           </div>
                        )}
                     </div>
                  </MenuList>
               </BoardList>
               <MenuList to="/board/2">Q&A</MenuList>

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
