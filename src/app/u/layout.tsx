import Sidebar from '@/components/layout/userDashboard/sidebar';
import React from 'react';

type DashboardLayoutProps = React.PropsWithChildren<unknown>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex max-w-5xl m-auto bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
