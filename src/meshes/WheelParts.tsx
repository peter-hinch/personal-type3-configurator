import React, { useRef } from 'react';

const WheelParts: React.FC<{
  nodes: any;
  materials: any;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const wheelParts = useRef();
  const wheelFrontLeft = useRef();
  const wheelFrontRight = useRef();
  const wheelRearLeft = useRef();
  const wheelRearRight = useRef();

  const zOffset = -0.327;
  const wheelbase = 2400 / 1000;
  const trackWidth = 1348 / 1000;
  const beamWidth = settings.beamWidth / 1000;

  const wheels = [
    { key: 'fl', ref: wheelFrontLeft },
    { key: 'fr', ref: wheelFrontRight },
    { key: 'rl', ref: wheelRearLeft },
    { key: 'rr', ref: wheelRearRight }
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

  return (
    <group ref={wheelParts} dispose={null}>
      {/* Tyre is only temporary - load wheels and tyres from separate file */}
      {/* <mesh geometry={nodes.tyre.geometry} material={materials.rubber} /> */}
      {wheels?.map((wheel) => (
        <group
          key={`wheel-${wheel.key}`}
          ref={wheel.ref}
          dispose={null}
          position={calcWheelPosition(wheel.key)}
        >
          {/* <mesh
            key={`rim_${wheel?.key}_${settings.wheelId}`}
            geometry={nodes[`rim_${wheel?.key}_${settings.wheelId}`].geometry}
            material={materials.chrome}
          /> */}
          <mesh
            key={`tyre_${wheel?.key}`}
            geometry={nodes.tyre.geometry}
            material={materials.rubber}
          />
        </group>
      ))}
    </group>
  );
};

export default WheelParts;
