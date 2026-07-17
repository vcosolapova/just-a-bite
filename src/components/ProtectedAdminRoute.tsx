import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const ADMIN_AUTH_KEY = "adminAuth";

export default function ProtectedAdminRoute({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
