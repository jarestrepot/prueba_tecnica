import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LayoutPublic from './layouts/LayoutPublic';
import { Login } from './pages/Login';
import { HomePage } from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './utils/ProtectedRoute';
import LayoutPrivate from './layouts/LayoutPrivate';
import { SnackbarProvider } from 'notistack';
import { Register } from './pages/Resgiter';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LayoutPublic />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Rutas protegidas */}
        <Route path="/" element={<LayoutPrivate />}>
          <Route element={<ProtectedRoute path="/" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
};

export default App;