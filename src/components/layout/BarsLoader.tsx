'use client';

import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function BarsLoader() {
  return (
    <div className="h-screen flex items-center justify-center ">
     <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  );
}