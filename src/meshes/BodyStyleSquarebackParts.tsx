import React, { useRef } from 'react';

const BodyStyleSquarebackParts: React.FC<{
  nodes;
  materials;
  paintColor;
}> = ({ nodes, materials, paintColor }) => {
  const bodyStyleSquareParts = useRef();

  return (
    <group ref={bodyStyleSquareParts} dispose={null}>
      <mesh
        geometry={nodes.roof_skin_square.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.rear_window_panels_square.geometry}
        material={materials.paint}
      />
      <mesh geometry={nodes.boot_square.geometry} material={materials.paint} />
      <mesh
        geometry={nodes.rear_windscreen_square.geometry}
        material={materials.glass}
      />
      <mesh geometry={nodes.rear_wing.geometry} material={materials.paint} />
    </group>
  );
};

export default BodyStyleSquarebackParts;
