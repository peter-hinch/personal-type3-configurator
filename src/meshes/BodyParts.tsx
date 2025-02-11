import React, { useLayoutEffect, useRef } from 'react';

import { useGLTF } from '@react-three/drei';

import { vehicleData } from './../data/vehicleData.js';

import CommonParts from './CommonParts.tsx';
import BodyStyleSquarebackParts from './BodyStyleSquarebackParts.tsx';
import BodyStyleNotchbackParts from './BodyStyleNotchbackParts.tsx';
import BodyStyleFastbackParts from './BodyStyleFastbackParts.tsx';

const BodyParts: React.FC<{
  settings: Settings;
}> = ({ settings }) => {
  // @ts-ignore
  const { nodes, materials, scene } = useGLTF('/volkswagen-type3.glb');

  const bodyRef = useRef();

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene, nodes, materials]);

  const paintColorData = vehicleData.paintColors.find(
    (color) => color.id === settings.paintColorId
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
      position={[0, 0.095 + rideHeight, -0.125]}
      rotation={[rakeAngle, 0, 0]}
    >
      <CommonParts
        nodes={nodes}
        materials={materials}
        paintColor={paintColorData?.hex}
      />
      {settings.bodyStyleId === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColorData?.hex}
        />
      )}
      {settings.bodyStyleId === 'notchback' && (
        <BodyStyleNotchbackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColorData?.hex}
        />
      )}
      {settings.bodyStyleId === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColorData?.hex}
        />
      )}
    </group>
  );
};

export default BodyParts;
