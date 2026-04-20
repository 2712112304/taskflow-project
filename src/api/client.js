const API_URL = 'https://taskflow-project-ufrm.vercel.app/api/v1/tasks';

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('No se pudieron obtener las tareas');
  }

  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo crear la tarea');
  }

  return data;
}

export async function deleteTaskRequest(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    let errorMessage = 'No se pudo eliminar la tarea';

    try {
      const data = await response.json();
      errorMessage = data.error || errorMessage;
    } catch (error) {
      // La respuesta puede venir vacía
    }

    throw new Error(errorMessage);
  }
}