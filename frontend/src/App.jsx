import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // ---  Importación 

function App() {
  return (
    <Router>
      <Routes>
        {/* Al entrar a la web, nos manda directo al login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Ruta del Inventario */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* el crud basicamente */}
      </Routes>
    </Router>
  );
}

export default App;