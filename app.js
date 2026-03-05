const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = [];

/* Cargar tareas guardadas al iniciar */
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  renderTasks();
}

/* Escuchar el envío del formulario */
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
});

/* Escuchar el buscador */
searchInput.addEventListener("input", function () {
  renderTasks(searchInput.value);
});

/* Añadir tarea */
function addTask(text) {
  const task = {
    id: Date.now(),
    text: text
  };

  tasks.push(task);
  saveTasks();
  renderTasks(searchInput.value);
}

/* Borrar tarea */
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks(searchInput.value);
}

/* Guardar en localStorage */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Pintar tareas en pantalla */
function renderTasks(searchText = "") {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchText.toLowerCase());
  });

  filteredTasks.forEach(function (task) {
    const article = document.createElement("article");
    article.className = "task-card";

    const title = document.createElement("h3");
    title.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    article.appendChild(title);
    article.appendChild(deleteButton);

    taskList.appendChild(article);
  });
}