import React from 'react';

import styled from 'styled-components';

const Tooltip: React.FC<{ children: any; text: string }> = ({
  children,
  text
}) => {
  return (
    <StyledTooltip>
      <div className="tooltip">{text}</div>
      {children}
    </StyledTooltip>
  );
};

const StyledTooltip = styled.div`
  position: relative;
  cursor: help;

  div.tooltip {
    position: absolute;
    top: -0.5rem;
    left: 100%;
    display: none;
    margin: 0 0 0 1.5rem;
    padding: 0.5rem;
    width: max-content;
    background: white;
    border-radius: 0.5rem;
  }

  &:hover {
    div.tooltip {
      display: block;
    }
  }
`;

export default Tooltip;
