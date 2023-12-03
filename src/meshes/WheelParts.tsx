import React, { useEffect, useRef } from 'react';

const WheelParts: React.FC<{ nodes: any; materials: any }> = ({
  nodes,
  materials
}) => {
  const wheelParts = useRef();

  return (
    <group ref={wheelParts} dispose={null}>
      <mesh geometry={nodes.tyre.geometry} material={materials.chassis} />
    </group>
  );
};

export default WheelParts;
