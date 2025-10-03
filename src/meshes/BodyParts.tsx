import React, { useLayoutEffect, useEffect, useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

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
  // console.log('nodes', nodes);

  const paintColor =
    vehicleData.paintColors.find((color) => color.id === settings.paintColorId)
      ?.colorValue || settings.paintColorCustom;

  // TODO: Offset rotation origin
  const wheelbase = 2400;
  const rideHeight =
    Math.min(settings.rideHeightFront, settings.rideHeightRear) / 1000;
  const rakeAngle = -Math.atan(
    (settings.rideHeightFront - settings.rideHeightRear - rideHeight) /
      wheelbase
  );

  const bodyRef = useRef();

  const [spring, setSpring] = useSpring(() => ({
    height: [0, 0.095 + rideHeight, -0.125],
    rake: [rakeAngle, 0, 0]
  }));

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene, nodes, materials]);

  useEffect(() => {
    setSpring({
      height: [0, 0.095 + rideHeight, -0.125],
      rake: [rakeAngle, 0, 0]
    });
  }, [rideHeight, rakeAngle, setSpring]);

  return (
    <animated.group
      ref={bodyRef}
      dispose={null}
      position={spring.height.to((x, y, z) => [x, y, z])}
      rotation={spring.rake.to((x, y, z) => [x, y, z])}
    >
      <CommonParts
        nodes={nodes}
        materials={materials}
        paintColor={paintColor}
      />
      {settings.bodyStyleId === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColor}
        />
      )}
      {settings.bodyStyleId === 'notchback' && (
        <BodyStyleNotchbackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColor}
        />
      )}
      {settings.bodyStyleId === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintColor={paintColor}
        />
      )}
    </animated.group>
  );
};

export default BodyParts;
