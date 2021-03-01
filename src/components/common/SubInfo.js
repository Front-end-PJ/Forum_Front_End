import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: black;

  /* span 사이에 가운뎃점 문자 보여주기*/
  span + span:before {
    color: ${palette.gray[6]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  div {
    display: block;
  }
  span {
    display: flex;
  }
`;

const SubInfo = ({ children, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <div></div>
    </SubInfoBlock>
  );
};

export default SubInfo;
