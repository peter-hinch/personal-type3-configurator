import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import WheelParts from './meshes/WheelParts.tsx';
import BodyParts from './meshes/BodyParts.tsx';

const Car: React.FC<{ settings: Settings }> = ({ settings }) => {
  // @ts-ignore
  const { scene, nodes, materials } = useGLTF('/volkswagen-type3.glb');

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene, nodes, materials]);

  return (
    <>
      <BodyParts nodes={nodes} materials={materials} settings={settings} />
      <WheelParts nodes={nodes} materials={materials} settings={settings} />
    </>
  );
};

export default Car;
