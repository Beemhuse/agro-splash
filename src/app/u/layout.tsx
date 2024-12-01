import ProtectedRoute from '@/components/layout/userDashboard/ProtectedRoute';
import Sidebar from '@/components/layout/userDashboard/sidebar';
import React from 'react';

type DashboardLayoutProps = React.PropsWithChildren<unknown>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex my-10 justify-start">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
