// Based on the example provided in the react-three fiber documentation.
// Reference: https://docs.pmnd.rs/react-three-fiber/getting-started/examples
// Reference: https://codesandbox.io/s/q48jgy
// Reference: https://codesandbox.io/s/9b56t

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial
} from '@react-three/drei';
import { Globals } from '@react-spring/three';
// import useMeasure from 'react-use-measure';
import styled from 'styled-components';

import { vehicleData } from './data/vehicleData.js';

import Car from './Car.tsx';
import Menu from './ui/Menu.tsx';

declare global {
  type Settings = {
    bodyStyleId: string;
    paintColorId: string;
    paintColorCustom: string;
    wheelId: string;
    bumperFrontId: string;
    bumperRearId: string;
    rideHeightFront: number;
    rideHeightRear: number;
    beamWidth: number;
  };
}

const defaultSettings = {
  bodyStyleId: vehicleData.bodyStyles[0].id,
  paintColorId: vehicleData.paintColors[17].id,
  paintColorCustom: 'gray',
  wheelId: vehicleData.wheels[0].id,
  bumperFrontId: vehicleData.bumpers[0].id,
  bumperRearId: vehicleData.bumpers[0].id,
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

  // const [viewportRef, viewPortBounds] = useMeasure({ debounce: 1000 });
  // console.log('viewportBounds', viewPortBounds);

  const overlayRef = useRef(null);

  const handleSettings = (
    key: keyof Settings,
    value:
      | Settings['bodyStyleId']
      | Settings['paintColorId']
      | Settings['paintColorCustom']
      | Settings['wheelId']
      | Settings['rideHeightFront']
      | Settings['rideHeightRear']
      | Settings['beamWidth']
  ) => {
    setSettings((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleShareUrl = async () => {
    setParameters({ settings: encodeURIComponent(JSON.stringify(settings)) });
    // TODO: May need to ensure permissions are present before copying
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <StyledViewport
    // ref={viewportRef}
    >
      <Menu
        overlayRef={overlayRef}
        settings={settings}
        handleSettings={handleSettings}
        handleShareUrl={handleShareUrl}
      />
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
      <div ref={overlayRef} className="viewport-overlay"></div>
    </StyledViewport>
  );
};

const StyledViewport = styled.div`
  height: 100vh;

  .viewport-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }
`;

export default App;
