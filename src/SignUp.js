import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase-config'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

// Componente de registro de usuario
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito o error
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Función para registrar al usuario
  const register = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpiar mensajes anteriores
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Mostrar mensaje de éxito con alert
      alert("Registro exitoso. Por favor, inicia sesión.");
    } catch (error) {
      alert("El correo electrónico ya está en uso");
    }
    
  };

  return (
    <div className="auth-form-container">
    <h2 className="form-title">Registrarse</h2>
    <form onSubmit={register} className="auth-form">
      <label>
        Correo:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      </label>
      <label>
        Confirmar Contraseña:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" required />
      </label>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Registrarse</button>
      </div>
    </form>
    {message && <p className="form-message">{message}</p>}
    <div className="redirect-message">
        ¿Ya tienes una cuenta? <span className="link" onClick={() => navigate('/signin')}>Iniciar Sesión</span>
      </div>
      {message && <p className="form-message">{message}</p>}
  </div>

  );
};

export default SignUp;
