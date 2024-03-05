import { initializeApp } from "firebase/app";

/**
 * Objeto de configuración de Firebase.
 * @type {Object}
 * @property {string} apiKey - La clave API de Firebase.
 * @property {string} authDomain - El dominio de autenticación de Firebase.
 * @property {string} projectId - El ID del proyecto de Firebase.
 * @property {string} storageBucket - El bucket de almacenamiento de Firebase.
 * @property {string} messagingSenderId - El ID del remitente de mensajes de Firebase.
 * @property {string} appId - El ID de la aplicación de Firebase.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB7eRQhLfQ62176qr9piXdRJ2_4R9oqL7E",
  authDomain: "sistema-docente.firebaseapp.com",
  projectId: "sistema-docente",
  storageBucket: "sistema-docente.appspot.com",
  messagingSenderId: "823016754123",
  appId: "1:823016754123:web:4758e0fda42e30d58f044e"
};

const app = initializeApp(firebaseConfig);

export default app;
