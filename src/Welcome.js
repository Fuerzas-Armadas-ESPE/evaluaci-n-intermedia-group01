import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from './firebase-config';
import './Welcome.css'; // Asegúrate de crear este archivo CSS

const Welcome = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  const [actividades, setActividades] = useState([]);

  const crearActividad = (nuevaActividad = { tema: "" }) => {
    const updatedActividades = [...actividades, nuevaActividad];
    setActividades(updatedActividades);
  };

  const obtenerActividad = (id) => {
    return actividades.find((actividad) => actividad.id === id);
  };

  const editarActividad = (id, updatedActividad) => {
    const updatedActividades = actividades.map((actividad) => {
      if (actividad.id === id) {
        return updatedActividad;
      }
      return actividad;
    });
    setActividades(updatedActividades);
  };

  const eliminarActividad = (id) => {
    const updatedActividades = actividades.filter((actividad) => actividad.id !== id);
    setActividades(updatedActividades);
  };

  return (
    <div className="welcome-page">
      <nav className="navbar">
        <div className="nav-content">
          <span className="page-title">Página Principal</span>
          <span className="courses-link" onClick={() => navigate("/mis-cursos")}>Mis Cursos</span>
          <span className="user-icon" onClick={logout}>Icono Usuario</span>
        </div>
      </nav>
      <div className="welcome-content">
        <h2>Bienvenido al Sistema Docente</h2>
        <h3>CRUD de actividades</h3>

        <table>
          <thead>
            <tr>
              <th>Tema</th>
              <th>Horas</th>
              <th>Objetivos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad) => (
              <tr key={actividad.id}>
                <td>{actividad.tema}</td>
                <td>{actividad.horas}</td>
                <td>{actividad.objetivos}</td>
                <td>
                  <button onClick={() => editarActividad(actividad.id)}>Editar</button>
                  <button onClick={() => eliminarActividad(actividad.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />

        <h3>Agregar actividad</h3>

        <form onSubmit={(e) => crearActividad(e.target.value)}>
          <input type="text" name="tema" placeholder="Ingrese el tema de la actividad" />
          <input type="number" name="horas" placeholder="Ingrese la cantidad de horas" />
          <input type="text" name="objetivos" placeholder="Ingrese los objetivos de la actividad" />
          <button type="submit">Agregar Actividad</button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;