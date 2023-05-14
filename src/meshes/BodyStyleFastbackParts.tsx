import React, { useRef } from 'react';

const BodyStyleFastbackParts: React.FC<{
  nodes;
  materials;
  settings: Settings;
}> = ({ nodes, materials, settings }) => {
  const bodyStyleFastbackParts = useRef();

  return (
    <group ref={bodyStyleFastbackParts} dispose={null}>
      <mesh
        geometry={nodes.rear_windows_fastback.geometry}
        material={materials.pearl_white}
      />
      <mesh
        geometry={nodes.roof_skin_fastback.geometry}
        material={materials.pearl_white}
      />
    </group>
  );
};

export default BodyStyleFastbackParts;
