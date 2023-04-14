import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface RoleRouteProps {
  allowedRoles: string;
}

const ROLES = ["user", "seller", "admin"];

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { access_token, role } = useSelector((state: any) => state.auth);

  const location = useLocation();
  console.log("RoleRoute -> location", location, role, allowedRoles);
  return ROLES.includes(role) && allowedRoles.includes(role) ? (
    <Outlet />
  ) : !access_token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
