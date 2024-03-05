// src/AddCourse.js
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import app from './firebase-config';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const db = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Por favor, rellena todos los campos.");
      return;
    }
    try {
      await addDoc(collection(db, "courses"), {
        name,
        description,
      });
      alert("Curso añadido con éxito.");
      setName('');
      setDescription('');
    } catch (error) {
      console.error("Error añadiendo el curso: ", error);
      alert("Error al añadir el curso.");
    }
  };

  return (
    <div>
      <h3>Crear Curso</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input 
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
        />
        <button type="submit">Crear Curso</button>
      </form>
    </div>
  );
};

const coursesCollectionRef = collection(db, "courses");
const [coursesSnapshot] = useCollection(query(coursesCollectionRef));

return (
  <div>
    {/* Formulario existente para añadir cursos */}
    <h3>Lista de Cursos</h3>
    <div>
      {coursesSnapshot ? (
        coursesSnapshot.docs.map(doc => (
          <div key={doc.id}>
            <strong>{doc.data().name}</strong> - {doc.data().description}
          </div>
        ))
      ) : (
        <span>Cargando cursos...</span>
      )}
    </div>
  </div>
);

export default AddCourse;
