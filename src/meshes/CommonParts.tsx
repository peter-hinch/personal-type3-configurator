import React, { useRef } from 'react';

const CommonParts: React.FC<{
  nodes;
  materials;
  settings: Settings;
  handleInteraction: Function;
}> = ({ nodes, materials, settings, handleInteraction }) => {
  const commonParts = useRef();

  return (
    <group ref={commonParts} dispose={null}>
      <mesh geometry={nodes.bonnet.geometry} material={materials.paint} />
      <mesh geometry={nodes.chassis.geometry} material={materials.chassis} />
      <mesh
        geometry={nodes.door_left.geometry}
        material={materials.paint}
        onPointerEnter={(event) => {
          handleInteraction(event, 'mouse entering left door');
        }}
        onPointerLeave={(event) => {
          handleInteraction(event, 'mouse leaving left door');
        }}
      />
      <mesh
        geometry={nodes.door_right.geometry}
        material={materials.paint}
        onPointerEnter={(event) => {
          handleInteraction(event, 'mouse entering right door');
        }}
        onPointerLeave={(event) => {
          handleInteraction(event, 'mouse leaving right door');
        }}
      />
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
      <mesh geometry={nodes.tyre.geometry} material={materials.chassis} />
      <mesh geometry={nodes.windscreen.geometry} material={materials.glass} />
    </group>
  );
};

export default CommonParts;
