import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "~/javascript/hooks/useCurrentUser";

export default function PrivateRoute() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
