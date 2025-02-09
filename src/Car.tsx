import React from 'react';

import WheelParts from './meshes/WheelParts.tsx';
import BodyParts from './meshes/BodyParts.tsx';

const Car: React.FC<{ settings: Settings }> = ({ settings }) => {
  return (
    <>
      <BodyParts settings={settings} />
      <WheelParts settings={settings} />
    </>
  );
};

export default Car;
