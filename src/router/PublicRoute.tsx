// src/router/PublicRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "../app/store";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
