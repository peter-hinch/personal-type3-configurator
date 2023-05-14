import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import CommonParts from './meshes/CommonParts.tsx';
import BodyStyleSquarebackParts from './meshes/BodyStyleSquarebackParts.tsx';
import BodyStyleFastbackParts from './meshes/BodyStyleFastbackParts.tsx';

const Car: React.FC<{ settings: Settings; handleToast: Function }> = ({
  settings,
  handleToast
}) => {
  // @ts-ignore
  const { scene, nodes, materials } = useGLTF('/volkswagen-type3.glb');
  const [paintMaterial, setPaintMaterial] = useState(materials.chassis);

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene, nodes, materials]);

  useEffect(() => {
    if (materials[`${settings.paintColour}`]) {
      setPaintMaterial(materials[`${settings.paintColour}`]);
    }
  }, [materials, settings]);

  return (
    <>
      <CommonParts
        nodes={nodes}
        materials={materials}
        paintMaterial={paintMaterial}
        handleToast={handleToast}
      />
      {settings.bodyStyle === 'squareback' && (
        <BodyStyleSquarebackParts
          nodes={nodes}
          materials={materials}
          paintMaterial={paintMaterial}
        />
      )}
      {settings.bodyStyle === 'fastback' && (
        <BodyStyleFastbackParts
          nodes={nodes}
          materials={materials}
          paintMaterial={paintMaterial}
        />
      )}
    </>
  );
};

export default Car;
