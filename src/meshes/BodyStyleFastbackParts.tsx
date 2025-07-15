import React, { useRef } from 'react';

const BodyStyleFastbackParts: React.FC<{
  nodes;
  materials;
  paintColor;
}> = ({ nodes, materials, paintColor }) => {
  const bodyStyleFastbackParts = useRef();

  return (
    <group ref={bodyStyleFastbackParts} dispose={null}>
      <mesh
        geometry={nodes.rear_window_panels_fastback.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.roof_skin_fastback.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.rear_windscreen_fastback.geometry}
        material={materials.glass}
      />
      <mesh geometry={nodes.rear_wing.geometry} material={materials.paint} />
    </group>
  );
};

export default BodyStyleFastbackParts;
