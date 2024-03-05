import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from './firebase-config';

const Welcome = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const logout = () => {
    signOut(auth).then(() => {
      // Cierre de sesión exitoso.
      navigate("/signin");
    }).catch((error) => {
      // Ocurrió un error.
      console.error("Error al cerrar sesión:", error);
    });
  };

  return (
    <div className="welcome-container">
      <h2>Bienvenido/a, {user ? user.email : "Usuario no identificado"}</h2>
      <h2>😀</h2>
      <button onClick={logout} className="logout-btn">Salir</button>
    </div>

  );
};

export default Welcome;
