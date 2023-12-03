import React, { useRef } from 'react';

import CommonParts from './CommonParts.tsx';
import BodyStyleSquarebackParts from './BodyStyleSquarebackParts.tsx';
import BodyStyleFastbackParts from './BodyStyleFastbackParts.tsx';

const BodyParts: React.FC<{
  nodes: any;
  materials: any;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const bodyParts = useRef();

  const rideHeight = () => settings.rideHeight / 1000;

  return (
    <group ref={bodyParts} dispose={null} position={[0, rideHeight(), 0]}>
      <CommonParts
        nodes={nodes}
        materials={materials}
        paintColour={settings.paintColour.hex}
      />
      {settings.bodyStyle.id === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintColour={settings.paintColour.hex}
        />
      )}
      {settings.bodyStyle.id === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintColour={settings.paintColour.hex}
        />
      )}
    </group>
  );
};

export default BodyParts;
