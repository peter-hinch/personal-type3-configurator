import React, { useRef } from 'react';

const BodyStyleSquarebackParts: React.FC<{
  nodes;
  materials;
  paintMaterial: THREE.Material;
}> = ({ nodes, materials, paintMaterial }) => {
  const bodyStyleSquareParts = useRef();

  return (
    <group ref={bodyStyleSquareParts} dispose={null}>
      <mesh
        geometry={nodes.roof_skin_square.geometry}
        material={paintMaterial}
      />
      <mesh
        geometry={nodes.rear_windows_square.geometry}
        material={paintMaterial}
      />
      <mesh geometry={nodes.boot_square.geometry} material={paintMaterial} />
    </group>
  );
};

export default BodyStyleSquarebackParts;
