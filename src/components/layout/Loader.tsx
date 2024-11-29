'use client';

import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
}
