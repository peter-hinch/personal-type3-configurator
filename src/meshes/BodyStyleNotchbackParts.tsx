import React, { useRef } from 'react';

const BodyStyleNotchbackParts: React.FC<{
  nodes;
  materials;
  paintColor;
}> = ({ nodes, materials, paintColor }) => {
  const bodyStyleNotchbackParts = useRef();

  return (
    <group ref={bodyStyleNotchbackParts} dispose={null}>
      {/* <mesh
        geometry={nodes.rear_window_panels_notchback.geometry}
        material={materials.paint}
      /> */}
      <mesh
        geometry={nodes.roof_skin_notch.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.rear_windscreen_notch.geometry}
        material={materials.glass}
      />
    </group>
  );
};

export default BodyStyleNotchbackParts;
