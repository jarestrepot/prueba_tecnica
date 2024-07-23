import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutPublic from './layouts/LayoutPublic'
import { Login } from './pages/Login'
import { Register } from './pages/Resgiter'
import { HomePage } from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import ProtectedRoute from './utils/ProtectedRoute'
import LayoutPrivate from './layouts/LayoutPrivate'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { useLocalStorage } from 'react-use'
import { useEffect, useState } from 'react'
import CONSTANTES from './global/constantes'
import IResponseModel from './interfaces/IresponseAction'
import { User } from './interfaces/IResponseCreate'
import fetchData from './api/postCreateUser'



const App = () => {
  const [user_storage] = useLocalStorage<{ id: string; token: string }>('token_user');
  const [, setUser] = useState<IResponseModel<User> | null>(null);
  const [isAuth, setAuth] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchDataInit = async () => {
      try {
        if (user_storage) {
          const response = await fetchData<undefined, IResponseModel<User>>({
            method: 'GET',
            url: `/user/${user_storage.id}`,
            headers: {
              'Authorization': `Bearer ${user_storage.token}`,
              'Content-Type': 'application/json',
            },
          });
          setUser(response.data);
          setAuth(response.success);
          localStorage.setItem('user_data', JSON.stringify({
            data: response.data
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        } else {
          enqueueSnackbar(CONSTANTES.ERROR_UNKNOWN('User data'), { variant: 'error' });
        }
      }
    };
    fetchDataInit();
  }, [enqueueSnackbar, user_storage, isAuth]);
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LayoutPublic />}>
            <Route path="/" element={<Login isAuth={Boolean(isAuth)} />}/>
            <Route path="/register" element={<Register isAuth={Boolean(isAuth)} />}/>
          </Route>
          {/* Protected routes */}
          <Route path="/" element={<LayoutPrivate />}>
            <Route element={<ProtectedRoute canactivate={Boolean(isAuth)} path="/" />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SnackbarProvider>
    </>
  )
}

export default App


