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

  const beamWidth = settings.beamWidth / 1000;

  const wheels = [
    { key: 'fl', ref: wheelFrontLeft },
    { key: 'fr', ref: wheelFrontRight },
    { key: 'rl', ref: wheelRearLeft },
    { key: 'rr', ref: wheelRearRight }
  ];

  const calcOffset = (key: string) => {
    switch (key) {
      case 'fl':
        return beamWidth;
      case 'fr':
        return -beamWidth;
      default:
        return 0;
    }
  };

  return (
    <group ref={wheelParts} dispose={null}>
      {wheels?.map((wheel) => (
        <group
          key={`wheel-${wheel.key}`}
          ref={wheel.ref}
          dispose={null}
          position={[calcOffset(wheel.key), 0, 0]}
        >
          <mesh
            key={`rim_${wheel?.key}_${settings.wheelId}`}
            geometry={nodes[`rim_${wheel?.key}_${settings.wheelId}`].geometry}
            material={materials.chrome}
          />
          <mesh
            key={`tyre_${wheel?.key}`}
            geometry={nodes[`tyre_${wheel?.key}`].geometry}
            material={materials.chassis}
          />
        </group>
      ))}
    </group>
  );
};

export default WheelParts;
