import { Navigate, Outlet } from "react-router-dom";
import { ICanActivatePath } from "../interfaces/ICanActivatePath";

const ProtectedRoute = ({ canactivate, path = '/' }: ICanActivatePath) => {
  if(!canactivate) return <Navigate to={path} replace />;
  return <Outlet />
}

export default ProtectedRoute;

