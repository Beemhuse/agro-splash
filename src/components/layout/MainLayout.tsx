'use client';
import init from '@/config/_config';
// import React, { useEffect, useState } from 'react';
// import Loader from './Loader';
type DashboardLayoutProps = React.PropsWithChildren<unknown>;

export default function MainLayout({ children }: DashboardLayoutProps) {
  init();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time or tie this to actual logic
//     const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust duration as needed
//     return () => clearTimeout(timer); // Cleanup timeout
//   }, []);

//   if (isLoading) {
//     return <Loader />;
//   }
  return (
    <div className='flex flex-col h-screen'>
      {children}
    </div>
  );
}
