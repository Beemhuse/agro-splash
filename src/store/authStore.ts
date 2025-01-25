// src/store/authStore.ts
import { create } from "zustand";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

interface AuthState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  user: object | null; // Store user details
  setEmail: (email: string) => void;
  setToken: (otp: string) => void;
  setUser: (user: object) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: cookies.get("auth_email") || null, // Initialize from cookie if available
  isAuthenticated: !!cookies.get("agro-token"),
  token: cookies.get("agro-token"),
  user: null, // Initialize user as null

  // Save email and authenticate user
  setEmail: (email: string) => {
    cookies.set("auth_email", email, {
      path: "/", // Available across the entire site
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent cross-site request forgery
    });
    set({ email});
  },
  setToken: (token: string) => {
    cookies.set("agro-token", token, {
      path: "/", // Available across the entire site
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent cross-site request forgery
    });
    set({ token, isAuthenticated: true });
  },
 // Save user details in the store
 setUser: (user: object) => {
    cookies.set("agro-user", user, {
        path: "/", // Available across the entire site
        maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent cross-site request forgery
      });
    set({ user });
  },
  // Logout and clear all data
  logout: () => {
    cookies.remove("agro-token", { path: "/" }); // Remove cookie
    cookies.remove("agro-user", { path: "/" }); // Remove cookie
      window.location.href = "/";
    set({ email: null, token: null, user: null, isAuthenticated: false });
  },
}));
