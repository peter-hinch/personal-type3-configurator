import React, { useRef } from 'react';

const CommonParts: React.FC<{ nodes; materials; settings: Settings }> = ({
  nodes,
  materials,
  settings
}) => {
  const commonParts = useRef();

  return (
    <group ref={commonParts} dispose={null}>
      <mesh geometry={nodes.bonnet.geometry} material={materials.paint} />
      <mesh geometry={nodes.chassis.geometry} material={materials.chassis} />
      <mesh geometry={nodes.door_left.geometry} material={materials.paint} />
      <mesh geometry={nodes.front_fascia.geometry} material={materials.paint} />
      <mesh geometry={nodes.front_wing.geometry} material={materials.paint} />
      <mesh
        geometry={nodes.headlight_lens.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.headlight_ring.geometry}
        material={materials.chrome}
      />
      <mesh
        geometry={nodes.heater_channel.geometry}
        material={materials.paint}
      />
      <mesh geometry={nodes.rear_fascia.geometry} material={materials.paint} />
      <mesh geometry={nodes.rear_wing.geometry} material={materials.paint} />
      <mesh
        geometry={nodes.taillight_lens.geometry}
        material={materials.light_lens_red}
      />
      <mesh
        geometry={nodes.taillight_reflector.geometry}
        material={materials.chrome}
      />
    </group>
  );
};

export default CommonParts;
