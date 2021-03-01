import React from 'react';
import styled from 'styled-components';

function SideArea({ children }) {
  return (
    <Wrapper>
      <Block>{children}</Block>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Block = styled.div`
  position: absolute;

  width: 1.5rem;
  left: -3.5rem;
`;

export default SideArea;
