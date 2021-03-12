import React, { useState } from "react";
import styled from "styled-components";
import SideArea from "./SideArea";
import palette from "../../lib/styles/palette";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
const SideBarBlock = styled.div`
   position: fixed;
   background: green;
   height: 100%;
   top: 0;
   left: 0;
   z-index: 5;
`;

const Wrapper = styled.div`
   position: fixed;
`;

const MenuButton = styled.div`
   display: flex;
   margin-left: 1rem;
   width: 2rem;
   height: 4rem;
   justify-content: center;
   flex-direction: column;
   :hover {
      .BoardList {
         position: relative;
         background: yellow;
         width: 4rem;
         margin-left: 0;
      }
   }
   .BoardList {
      display: none;
      margin-left: -40px;
   }
`;

const Side = ({}) => {
   const [set, onSet] = useState(false);
   return (
      <SideBarBlock>
         <MenuButton>
            <RiMenuUnfoldLine size="3rem" />

            <Link className="BoardList">1</Link>
            <Link className="BoardList">1</Link>
            <Link className="BoardList">1</Link>
         </MenuButton>
      </SideBarBlock>
   );
};

export default Side;
