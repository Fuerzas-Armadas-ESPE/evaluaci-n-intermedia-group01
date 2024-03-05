import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase-config';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // Estado para indicar si se está cargando la autenticación
      isAuthenticated: false // Estado para indicar si el usuario está autenticado
    };
  }

  componentDidMount() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ isAuthenticated: true, isLoading: false }); // Si el usuario está autenticado, actualiza el estado
      } else {
        this.setState({ isAuthenticated: false, isLoading: false }); // Si el usuario no está autenticado, actualiza el estado
      }
    });
  }

  render() {
    const { isLoading, isAuthenticated } = this.state;
    const { children } = this.props;

    if (isLoading) {
      return <div>Loading...</div>; // Si se está cargando la autenticación, muestra un indicador de carga
    }

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />; // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    }

    return children; // Si el usuario está autenticado, muestra los componentes hijos
  }
}

export default ProtectedRoute;
