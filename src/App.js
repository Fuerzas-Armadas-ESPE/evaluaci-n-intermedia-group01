import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {

  // Configuración de las rutas de la aplicación
  return (
    <Router>
      <div>
      <Routes>
        {/* Ruta para el registro de usuarios */}
        <Route path="/SignUp" element={<SignUp />} />
        {/* Ruta para el inicio de sesión */}
        <Route path="/SignIn" element={<SignIn />} />
        {/* Ruta para la página de bienvenida, protegida por autenticación */}
        <Route path="/HomePage" element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        } />
        {/* Ruta por defecto, redirige al inicio de sesión */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
