import React, { useEffect, useRef } from 'react';

import { useSpring, animated } from '@react-spring/three';

const CommonParts: React.FC<{
  settings: Settings;
  nodes;
  materials;
  paintColor;
}> = ({ settings, nodes, materials, paintColor }) => {
  const commonParts = useRef();
  const [spring, setSpring] = useSpring(() => ({
    color: paintColor
  }));

  useEffect(() => {
    setSpring({ color: paintColor });
  }, [materials, paintColor, setSpring]);

  return (
    <group ref={commonParts} dispose={null}>
      <animated.mesh
        geometry={nodes.bonnet.geometry}
        material={materials.paint}
        material-color={spring.color}
      />
      <animated.mesh
        geometry={nodes.door_left.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.front_fascia.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.front_wing.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.rear_fascia.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.body_frunk.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.body_inner_front_well.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.body_boot_floor.geometry}
        material={materials.paint}
      />
      <animated.mesh
        geometry={nodes.heater_channel.geometry}
        material={materials.paint}
      />
      <mesh
        geometry={nodes.chassis_pan.geometry}
        material={materials.chassis}
      />
      <mesh
        geometry={nodes.headlight_lens.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.headlight_ring.geometry}
        material={materials.chrome}
      />
      <mesh
        geometry={nodes.taillight_lens.geometry}
        material={materials.light_lens_red}
      />
      <mesh
        geometry={nodes.taillight_reflector.geometry}
        material={materials.chrome}
      />
      <mesh geometry={nodes.windscreen.geometry} material={materials.glass} />
      <mesh
        geometry={nodes.vent_wing_windows.geometry}
        material={materials.glass}
      />
      {settings.bumperFrontId === 'early' && (
        <mesh
          geometry={nodes.bumper_front.geometry}
          material={materials.chrome}
        />
      )}
      {settings.bumperRearId === 'early' && (
        <mesh
          geometry={nodes.bumper_rear.geometry}
          material={materials.chrome}
        />
      )}
    </group>
  );
};

export default CommonParts;
