import React, { useLayoutEffect, useRef } from 'react';

import { useGLTF } from '@react-three/drei';

const WheelParts: React.FC<{
  settings: Settings;
}> = ({ settings }) => {
  // @ts-ignore
  const [tyre, wheel] = useGLTF(['/tyre.glb', '/wheel-914-2-litre.glb']);

  const wheelParts = useRef();
  const wheelFrontLeft = useRef();
  const wheelFrontRight = useRef();
  const wheelRearLeft = useRef();
  const wheelRearRight = useRef();

  const tyreParts = useRef();
  const tyreFrontLeft = useRef();
  const tyreFrontRight = useRef();
  const tyreRearLeft = useRef();
  const tyreRearRight = useRef();

  const zOffset = -0.42;
  const wheelbase = 2400 / 1000;
  const trackWidth = 1320 / 1000; // 1348 - narrower to avoid clipping
  const beamWidth = settings.beamWidth / 1000;

  const wheels = [
    { key: 'fl', wheelRef: wheelFrontLeft, tyreRef: tyreFrontLeft },
    { key: 'fr', wheelRef: wheelFrontRight, tyreRef: tyreFrontRight },
    { key: 'rl', wheelRef: wheelRearLeft, tyreRef: tyreRearLeft },
    { key: 'rr', wheelRef: wheelRearRight, tyreRef: tyreRearRight }
  ];

  const calcWheelPosition = (key: string) => {
    switch (key) {
      case 'fl':
        return [trackWidth / 2 + beamWidth, zOffset, wheelbase / 2];
      case 'fr':
        return [-trackWidth / 2 - beamWidth, zOffset, wheelbase / 2];
      case 'rl':
        return [trackWidth / 2, zOffset, -wheelbase / 2];
      case 'rr':
        return [-trackWidth / 2, zOffset, -wheelbase / 2];
      default:
        return [0, 0, 0];
    }
  };

  useLayoutEffect(() => {
    wheel?.scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [wheel?.scene, wheel?.nodes, wheel?.materials]);

  useLayoutEffect(() => {
    tyre?.scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [tyre?.scene, tyre?.nodes, tyre?.materials]);

  return (
    <>
      <group ref={wheelParts} dispose={null}>
        {wheels?.map((_) => (
          <group
            key={`wheel-${_.key}`}
            ref={_.wheelRef}
            dispose={null}
            position={calcWheelPosition(_.key)}
            rotation={
              _.key === 'fr' || _.key === 'rr' ? [0, Math.PI, 0] : [0, 0, 0]
            }
          >
            <mesh
              key={`tyre_${_?.key}`}
              geometry={wheel?.nodes.wheel.geometry}
              material={wheel?.materials.polished}
            />
          </group>
        ))}
      </group>
      <group ref={tyreParts} dispose={null}>
        {wheels?.map((_) => (
          <group
            key={`tyre-${_.key}`}
            ref={_.tyreRef}
            dispose={null}
            position={calcWheelPosition(_.key)}
          >
            <mesh
              key={`tyre_${_?.key}`}
              geometry={tyre?.nodes.tyre.geometry}
              material={tyre?.materials.rubber}
            />
          </group>
        ))}
      </group>
    </>
  );
};

export default WheelParts;
