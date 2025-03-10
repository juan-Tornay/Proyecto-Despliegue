const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tareas = [];
let id = 1;

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const { nombre, descripcion } = req.body;
  const nuevaTarea = { id: id++, nombre, descripcion };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter(tarea => tarea.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
