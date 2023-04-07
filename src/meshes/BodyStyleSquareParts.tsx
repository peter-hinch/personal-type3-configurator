import React, { useRef } from 'react';

const BodyStyleSquareParts: React.FC<{ nodes; materials }> = ({
  nodes,
  materials
}) => {
  const bodyStyleSquareParts = useRef();

  return (
    <group ref={bodyStyleSquareParts} dispose={null}>
      <mesh
        geometry={nodes.roof_skin_square.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.rear_windows_square.geometry}
        material={materials.paint}
      />
      <mesh geometry={nodes.boot_square.geometry} material={materials.paint} />
    </group>
  );
};

export default BodyStyleSquareParts;
