import React, { useLayoutEffect, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Car: React.FC<{ settings: Settings; props: any }> = ({
  settings,
  props
}) => {
  // @ts-ignore
  const { scene, nodes, materials } = useGLTF('/volkswagen-type3.glb');

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
    // console.log(scene);
    // console.log(nodes);
    // console.log(materials);
  }, [scene, nodes, materials]);

  useEffect(() => {
    if (
      nodes.rear_windows_square &&
      nodes.roof_skin_square &&
      nodes.boot_square &&
      nodes.rear_windows_fastback &&
      nodes.roof_skin_fastback
    ) {
      if (settings.bodyStyle === 'square') {
        nodes.roof_skin_square.visible = true;
        nodes.rear_windows_square.visible = true;
        nodes.boot_square.visible = true;
        nodes.rear_windows_fastback.visible = false;
        nodes.roof_skin_fastback.visible = false;
      }
      if (settings.bodyStyle === 'fastback') {
        nodes.roof_skin_square.visible = false;
        nodes.rear_windows_square.visible = false;
        nodes.boot_square.visible = false;
        nodes.rear_windows_fastback.visible = true;
        nodes.roof_skin_fastback.visible = true;
      }
    }
  }, [nodes, settings]);

  return <primitive object={scene} {...props} />;
};

export default Car;
