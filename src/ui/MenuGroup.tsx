import React, { useState } from 'react';

import { Globals } from '@react-spring/shared';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import styled from 'styled-components';

Globals.assign({ frameLoop: 'always' });

const MenuGroup: React.FC<{
  title: string;
  children: any;
}> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [contentRef, { height }] = useMeasure();
  const heightAnimationProps = useSpring({ height: isExpanded ? height : 0 });
  const contentAnimationProps = useSpring({
    opacity: isExpanded ? 1 : 0,
    delay: 200
  });

  return (
    <StyledSettingGroup>
      <h4
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <span>{title}</span>
        <span>{!isExpanded ? '+' : '-'}</span>
      </h4>
      <animated.div className="group-container" style={heightAnimationProps}>
        <div className="group-container__content" ref={contentRef}>
          <animated.div style={contentAnimationProps}>{children}</animated.div>
        </div>
      </animated.div>
    </StyledSettingGroup>
  );
};

const StyledSettingGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin: 0 0 0.5rem;
  width: 220px;
  background: white;
  border: none;
  border-radius: 0.5rem;
  user-select: none;

  h4 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.25rem 0;
    cursor: pointer;
  }

  .group-container {
    overflow-y: hidden;

    .group-container__ {
      &content {
        padding-bottom: 4px;
      }
    }
  }

  .option {
    margin: 0.25rem 0;

    input {
      margin-left: 0;
    }
  }
`;

export default MenuGroup;
