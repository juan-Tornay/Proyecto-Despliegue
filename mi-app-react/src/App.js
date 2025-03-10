import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    fetchData('tareas');
  }, []);

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/${endpoint}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Error al hacer la petición', err);
      setData([]);
    }
    setLoading(false);
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const nuevaTarea = await res.json();
      setData([...data, nuevaTarea]);
      setNombre('');
      setDescripcion('');
    } catch (err) {
      console.error('Error al crear la tarea', err);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi App React - API Fetch</h1>
        <button onClick={() => fetchData('tareas')}>Cargar Tareas</button>
        <div style={{ marginTop: '2rem' }}>
          <input
            type="text"
            placeholder="Nombre de la tarea"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            placeholder="Descripción de la tarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button onClick={createTask}>Crear Tarea</button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            data.length > 0 ? (
              <pre>
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <p>No hay datos</p>
            )
          )}
        </div>
      </header>
    </div>
  );
}

export default App;