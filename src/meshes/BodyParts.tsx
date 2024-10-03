import React, { useRef } from 'react';

import { vehicleData } from './../data/vehicleData.js';

import CommonParts from './CommonParts.tsx';
import BodyStyleSquarebackParts from './BodyStyleSquarebackParts.tsx';
import BodyStyleNotchbackParts from './BodyStyleNotchbackParts.tsx';
import BodyStyleFastbackParts from './BodyStyleFastbackParts.tsx';

const BodyParts: React.FC<{
  nodes: any;
  materials: any;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const bodyRef = useRef();

  const paintColourData = vehicleData.paintColours.find(
    (colour) => colour.id === settings.paintColourId
  );

  // TODO: Offset rotation origin
  const wheelbase = 2400;
  const rideHeight =
    Math.min(settings.rideHeightFront, settings.rideHeightRear) / 1000;
  const rakeAngle = -Math.atan(
    (settings.rideHeightFront - settings.rideHeightRear - rideHeight) /
      wheelbase
  );

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
        paintColour={paintColourData?.hex}
      />
      {settings.bodyStyleId === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintColour={paintColourData?.hex}
        />
      )}
      {settings.bodyStyleId === 'notchback' && (
        <BodyStyleNotchbackParts
          nodes={nodes}
          materials={materials}
          paintColour={paintColourData?.hex}
        />
      )}
      {settings.bodyStyleId === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintColour={paintColourData?.hex}
        />
      )}
    </group>
  );
};

export default BodyParts;
