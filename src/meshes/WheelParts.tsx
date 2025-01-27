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

  const wheelbase = 2400;
  const trackWidth = 1348;
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
        return [+beamWidth, 0, 0];
      case 'fr':
        return [-beamWidth, 0, 0];
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
