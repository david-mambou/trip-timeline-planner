import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "~/javascript/context/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      window.alert("You must be logged in to access this page.");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return <Outlet />;
}
