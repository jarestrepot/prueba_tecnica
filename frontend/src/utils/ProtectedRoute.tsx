import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ICanActivatePath } from "../interfaces/ICanActivatePath";
import { useLocalStorage } from "react-use";
import { createContext, useEffect, useState } from 'react';
import IResponseModel from "../interfaces/IresponseAction";
import { User, UserData } from "../interfaces/IResponseCreate";
import fetchData from "../api/postCreateUser";

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType>({ user: null });

const ProtectedRoute = ({ path = '/' }: ICanActivatePath) => {
  const [user_storage, , removeUserStorage] = useLocalStorage<{ id: string; token: string }>('token_user');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if( user_storage ){
      const fetchDataStorage = async () => {
        try{
          const headers: Record<string, string> = user_storage.token ? { 'Authorization': `Bearer ${user_storage.token}` } : {};
          const response = await fetchData<undefined, IResponseModel<UserData>>({
            method: 'GET',
            url: `/user/${user_storage.id}`,
            headers
          });
          if(response.data && response.success){
            setUser(response.data as unknown as User);
          }else{
            removeUserStorage();
            navigate('/login')
          }
        }catch(err){
          removeUserStorage();
          navigate('/login')
        }
      }
      fetchDataStorage();
    }else{
      setUser(null);
    }
  }, [user_storage, path, navigate, removeUserStorage]);

  if (!user_storage) return <Navigate to={path} replace />;
  return (
    <UserContext.Provider value={{ user }}>
      <Outlet />
    </UserContext.Provider>
  );
}

export default ProtectedRoute;

