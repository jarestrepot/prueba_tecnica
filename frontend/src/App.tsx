import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LayoutPublic from './layouts/LayoutPublic';
import { Login } from './pages/Login';
import { HomePage } from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './utils/ProtectedRoute';
import LayoutPrivate from './layouts/LayoutPrivate';
import { SnackbarProvider } from 'notistack';
import { useLocalStorage } from 'react-use';
import { useState } from 'react';
import { Register } from './pages/Resgiter';

const App = () => {
  const [user_storage] = useLocalStorage<{ id: string; token: string }>('token_user');
  const [isAuth] = useState<boolean>(!!user_storage);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LayoutPublic />}>
          <Route path="/" element={<Login isAuth={Boolean(isAuth)} />} />
          <Route path="/register" element={<Register isAuth={Boolean(isAuth)} />} />
        </Route>
        {/* Rutas protegidas */}
        <Route path="/" element={<LayoutPrivate />}>
          <Route element={<ProtectedRoute path="/" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
          <Route path="*" element={<Navigate to="/about" />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
};

export default App;