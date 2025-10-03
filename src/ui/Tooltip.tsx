import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

type TCoords = {
  x: number;
  y: number;
};

const Tooltip: React.FC<{
  overlayRef: any;
  children: any;
  text: string;
}> = ({ overlayRef, children, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayOffset, setOverlayOffset] = useState<TCoords>({
    x: 0,
    y: 0
  });

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onMouseMove={(e) =>
        setOverlayOffset({ x: e.pageX || 0, y: e.pageY || 0 })
      }
    >
      {children}
      {overlayRef.current &&
        isOpen &&
        createPortal(
          <StyledTooltip $overlayOffset={overlayOffset}>
            <div className="tooltip">{text}</div>
          </StyledTooltip>,
          overlayRef.current
        )}
    </div>
  );
};

const StyledTooltip = styled.div.attrs((props) => ({
  style: {
    top: props?.$overlayOffset?.y,
    left: props?.$overlayOffset?.x
  }
}))`
  position: absolute;
  margin: 0 0 0 1.5rem;
  padding: 0.5rem;
  width: max-content;
  background: white;
  border-radius: 0.5rem;
  pointer-events: auto;
`;

export default Tooltip;
