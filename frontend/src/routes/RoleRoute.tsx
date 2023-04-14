import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/redux-hooks";

interface RoleRouteProps {
  allowedRoles: string;
}

const ROLES = ["user", "seller", "admin"];

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { accessToken, role } = useAppSelector((state) => state.authSlice);

  const location = useLocation();
  console.log("RoleRoute -> location", location, role, allowedRoles);
  return ROLES.includes(role) && allowedRoles.includes(role) ? (
    <Outlet />
  ) : !accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
