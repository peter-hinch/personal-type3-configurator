import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import WheelParts from './meshes/WheelParts.tsx';
import BodyParts from './meshes/BodyParts.tsx';

const Car: React.FC<{ settings: Settings }> = ({ settings }) => {
  // @ts-ignore
  const car = useGLTF('/volkswagen-type3.glb');
  const tyre = useGLTF('/tyre.glb');

  useLayoutEffect(() => {
    car.scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [car.scene, car.nodes, car.materials]);

  useLayoutEffect(() => {
    tyre.scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [tyre.scene, tyre.nodes, tyre.materials]);

  return (
    <>
      <BodyParts
        nodes={car.nodes}
        materials={car.materials}
        settings={settings}
      />
      <WheelParts
        nodes={tyre.nodes}
        materials={tyre.materials}
        settings={settings}
      />
    </>
  );
};

export default Car;
