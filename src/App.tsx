// Based on the example provided in the react-three fiber documentation.
// Reference: https://docs.pmnd.rs/react-three-fiber/getting-started/examples
// Reference: https://codesandbox.io/s/q48jgy
// Reference: https://codesandbox.io/s/9b56t

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial
} from '@react-three/drei';
import { Globals } from '@react-spring/three';

import { vehicleData } from './data/vehicleData.js';

import Car from './Car.tsx';
import Controls from './ui/Controls.tsx';

declare global {
  type Settings = {
    bodyStyleId: string;
    paintColorId: string;
    wheelId: string;
    rideHeightFront: number;
    rideHeightRear: number;
    beamWidth: number;
  };
}

const defaultSettings = {
  bodyStyleId: vehicleData.bodyStyles[0].id,
  paintColorId: vehicleData.paintColors[17].id,
  wheelId: vehicleData.wheels[0].id,
  rideHeightFront: 0,
  rideHeightRear: 0,
  beamWidth: 0
};

Globals.assign({ frameLoop: 'always' });

const App: React.FC = () => {
  const [parameters, setParameters] = useSearchParams();
  const [settings, setSettings] = useState(
    JSON.parse(decodeURIComponent(parameters.get('settings'))) ||
      defaultSettings
  );

  const handleSettings = (
    key: keyof Settings,
    value:
      | Settings['bodyStyleId']
      | Settings['paintColorId']
      | Settings['wheelId']
      | Settings['rideHeightFront']
      | Settings['rideHeightRear']
      | Settings['beamWidth']
  ) => {
    setSettings((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    setParameters({ settings: encodeURIComponent(JSON.stringify(settings)) });
  }, [settings, setParameters]);

  return (
    <>
      <Controls settings={settings} handleSettings={handleSettings} />
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={['#101010']} />
        <fog attach="fog" args={['#101010', 10, 20]} />
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage>
              <Car
                settings={settings}
                position={[0, 0, 0]}
                scale={1}
                rotation-y={-Math.PI / 4}
              />
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]}>
              <planeGeometry args={[170, 170]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                mirror={0.5}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            </mesh>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
