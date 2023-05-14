import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import CommonParts from './meshes/CommonParts.tsx';
import BodyStyleSquarebackParts from './meshes/BodyStyleSquarebackParts.tsx';
import BodyStyleFastbackParts from './meshes/BodyStyleFastbackParts.tsx';

const Car: React.FC<{ settings: Settings }> = ({ settings }) => {
  // @ts-ignore
  const { scene, nodes, materials } = useGLTF('/volkswagen-type3.glb');

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene, nodes, materials]);

  const handleInteraction = (event, cta: string) => {
    console.log(cta);
  };

  return (
    <>
      <CommonParts
        nodes={nodes}
        materials={materials}
        settings={settings}
        handleInteraction={handleInteraction}
      />
      {settings.bodyStyle === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          settings={settings}
        />
      )}
      {settings.bodyStyle === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          settings={settings}
        />
      )}
    </>
  );
};

export default Car;
