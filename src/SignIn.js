import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase-config';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Función para iniciar sesión
  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homepage"); // Redirige al usuario a la página de bienvenida tras el inicio de sesión exitoso
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-form-container">
    <h2 className="form-title">Iniciar sesión</h2>
    <form onSubmit={login} className="auth-form">
      <label>
        Correo:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      </label>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Iniciar Sesión</button>
        <button onClick={() => navigate("/signup")} type="button" className="switch-btn">Registro</button>
      </div>
    </form>
  </div>

  );
};

export default SignIn;
