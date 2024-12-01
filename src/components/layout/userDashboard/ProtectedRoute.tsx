"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Loader from "../Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    // Optionally, you can display a loader while checking auth state
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <p><Loader /></p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
