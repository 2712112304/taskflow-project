let tasks = [];

/**
 * Devuelve todas las tareas almacenadas en memoria.
 * @returns {Array<Object>}
 */
function obtenerTodas() {
  return tasks;
}

/**
 * Crea una nueva tarea y la guarda en memoria.
 * @param {Object} data
 * @param {string} data.title
 * @param {string} data.category
 * @param {string} data.platform
 * @param {string} data.rating
 * @returns {Object}
 */
function crearTarea(data) {
  const nuevaTarea = {
    id: Date.now().toString(),
    title: data.title,
    category: data.category,
    platform: data.platform,
    rating: data.rating,
    viewed: false,
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
}

/**
 * Elimina una tarea por id.
 * @param {string} id
 */
function eliminarTarea(id) {
  const initialLength = tasks.length;

  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  if (tasks.length === initialLength) {
    throw new Error('NOT_FOUND');
  }
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
};