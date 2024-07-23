import { Navigate, Outlet } from "react-router-dom";
import { ICanActivatePath } from "../interfaces/ICanActivatePath";
import { useLocalStorage } from "react-use";

const ProtectedRoute = ({ path = '/' }: ICanActivatePath) => {
  const [user_storage] = useLocalStorage<{ id: string; token: string }>('token_user');
  if (!user_storage) return <Navigate to={path} replace />;
  return <Outlet />
}

export default ProtectedRoute;

