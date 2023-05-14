import React from 'react';
import styled from 'styled-components';

const Toast: React.FC<{ isVisible: boolean; message: string }> = ({
  isVisible,
  message
}) => {
  return <>{isVisible && <StyledPopUp>{message}</StyledPopUp>}</>;
};

const StyledPopUp = styled.div`
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: white;
  border: none;
  border-radius: 0.5rem;
`;

export default Toast;
