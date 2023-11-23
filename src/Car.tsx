import React, { useLayoutEffect, useState, useEffect } from 'react';
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

  return (
    <>
      <CommonParts
        nodes={nodes}
        materials={materials}
        paintColour={settings.paintColour.hex}
      />
      {settings.bodyStyle === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintColour={settings.paintColour.hex}
        />
      )}
      {settings.bodyStyle === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintColour={settings.paintColour.hex}
        />
      )}
    </>
  );
};

export default Car;
