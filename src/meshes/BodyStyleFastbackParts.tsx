import React, { useRef } from 'react';

const BodyStyleFastbackParts: React.FC<{
  nodes;
  materials;
  paintMaterial: THREE.Material;
}> = ({ nodes, materials, paintMaterial }) => {
  const bodyStyleFastbackParts = useRef();

  return (
    <group ref={bodyStyleFastbackParts} dispose={null}>
      <mesh
        geometry={nodes.rear_windows_fastback.geometry}
        material={paintMaterial}
      />
      <mesh
        geometry={nodes.roof_skin_fastback.geometry}
        material={paintMaterial}
      />
    </group>
  );
};

export default BodyStyleFastbackParts;
