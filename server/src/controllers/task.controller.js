const taskService = require('../services/task.service');

function obtenerTareas(req, res) {
  const tasks = taskService.obtenerTodas();
  res.status(200).json(tasks);
}

function crearTarea(req, res) {
  const { title, category, platform, rating } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res
      .status(400)
      .json({ error: 'El título es obligatorio y debe tener al menos 3 caracteres.' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'La categoría es obligatoria.' });
  }

  if (!platform || typeof platform !== 'string') {
    return res.status(400).json({ error: 'La plataforma es obligatoria.' });
  }

  if (!rating || typeof rating !== 'string') {
    return res.status(400).json({ error: 'La valoración es obligatoria.' });
  }

  const nuevaTarea = taskService.crearTarea({
    title: title.trim(),
    category: category.trim(),
    platform: platform.trim(),
    rating: rating.trim(),
  });

  return res.status(201).json(nuevaTarea);
}

function eliminarTarea(req, res, next) {
  const { id } = req.params;

  try {
    taskService.eliminarTarea(id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
};