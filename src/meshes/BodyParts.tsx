import React, { useRef } from 'react';

import CommonParts from './CommonParts.tsx';
import BodyStyleSquarebackParts from './BodyStyleSquarebackParts.tsx';
import BodyStyleFastbackParts from './BodyStyleFastbackParts.tsx';

const BodyParts: React.FC<{
  nodes: any;
  materials: any;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const bodyRef = useRef();

  // TODO: Offset rotation origin
  const wheelbase = 2400;
  const rideHeight =
    Math.min(settings.rideHeightFront, settings.rideHeightRear) / 1000;
  const rakeAngle = -Math.atan(
    (settings.rideHeightFront - settings.rideHeightRear - rideHeight) /
      wheelbase
  );
  const rotationOffsetZ = wheelbase / 2 / 1000;

  return (
    <group
      ref={bodyRef}
      dispose={null}
      position={[0, rideHeight, 0]}
      rotation={[rakeAngle, 0, 0]}
    >
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
