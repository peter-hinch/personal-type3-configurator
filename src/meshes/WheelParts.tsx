import React, { useEffect, useRef } from 'react';

const WheelParts: React.FC<{
  nodes: any;
  materials: any;
  settings: Settings;
}> = ({ nodes, materials }) => {
  const wheelParts = useRef();

  const instances = ['fl', 'fr', 'rl', 'rr'];

  return (
    <group ref={wheelParts} dispose={null}>
      {/* Rims - 2 Litre Alloys */}
      {instances.map((instance) => (
        <mesh
          key={`rim_${instance}_2litre`}
          geometry={nodes[`rim_${instance}_2litre`].geometry}
          material={materials.chrome}
        />
      ))}
      {/* Tyres */}
      {instances.map((instance) => (
        <mesh
          key={`tyre_${instance}`}
          geometry={nodes[`tyre_${instance}`].geometry}
          material={materials.chassis}
        />
      ))}
    </group>
  );
};

export default WheelParts;
