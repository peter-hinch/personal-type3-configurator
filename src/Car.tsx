import React, { useLayoutEffect, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Car: React.FC<{ props: any }> = ({ props }) => {
  const { scene, nodes, materials } = useGLTF('/volkswagen-type3.glb');

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
    if (nodes.rear_windows_fastback && nodes.roof_skin_fastback) {
      nodes.rear_windows_fastback.visible = false;
      nodes.roof_skin_fastback.visible = false;
    }
  }, [scene, nodes, materials]);

  return <primitive object={scene} {...props} />;
};

export default Car;
