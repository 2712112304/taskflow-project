import { getTasks, createTask, deleteTaskRequest } from './src/api/client.js';
const platformSelect = document.getElementById("platform-select");
const prioritySelect = document.getElementById("priority-select");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const statusFilter = document.getElementById("status-filter");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const defaultGamesContainer = document.getElementById("default-games")
const totalCountEl = document.getElementById("total-count");
const viewedStatsCountEl = document.getElementById("viewed-stats-count");
const pendingCountEl = document.getElementById("pending-count");
const loadingMessageEl = document.getElementById("loading-message");
const errorMessageEl = document.getElementById("error-message");

const markAllViewedBtn = document.getElementById("mark-all-viewed-btn");
const clearAllBtn = document.getElementById("clear-all-btn");

let tasks = [];
let selectedCategory = "Todas";

function setLoading(isLoading) {
  if (!loadingMessageEl) return;
  loadingMessageEl.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  if (!errorMessageEl) return;
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove("hidden");
}

function clearError() {
  if (!errorMessageEl) return;
  errorMessageEl.textContent = "";
  errorMessageEl.classList.add("hidden");
}

async function loadTasksFromApi() {
  setLoading(true);
  clearError();

  try {
    tasks = await getTasks();
    hideOldHtmlGames();
    renderTasks();
  } catch (error) {
    showError(error.message || "No se pudieron cargar las tareas.");
  } finally {
    setLoading(false);
  }
}

async function initializeApp() {
  hideOldHtmlGames();
  await loadTasksFromApi();
}

/* Cargar datos */
initializeApp();

/* Formulario */
taskForm.addEventListener("submit", handleTaskFormSubmit);

/* Buscador */
searchInput.addEventListener("input", function () {
  renderTasks();
});


if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    renderTasks();
  });
}
if (statusFilter) {
  statusFilter.addEventListener("change", function () {
    renderTasks();
  });
}

/* Filtros */
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;
    renderTasks();
  });
});

/* Botón marcar todos como vistos */
if (markAllViewedBtn) {
  markAllViewedBtn.addEventListener("click", function () {
    markAllAsViewed();
  });
}

/* Botón borrar todos */
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", function () {
    clearAllTasks();
  });
}
/**
 * Gestiona el envío del formulario y añade una nueva tarea si pasa las validaciones.
 * @param {Event} event
 */
async function handleTaskFormSubmit(event) {
  event.preventDefault();

  const taskTitle = taskInput.value.trim();
  const category = categorySelect.value;
  const platform = platformSelect.value;
  const rating = prioritySelect.value;

  if (taskTitle === "") {
    alert("El título no puede estar vacío.");
    return;
  }

  if (taskTitle.length < 3) {
    alert("El título debe tener al menos 3 caracteres.");
    return;
  }

  const taskAlreadyExists = tasks.some(function (task) {
    return task.title.toLowerCase() === taskTitle.toLowerCase();
  });

  if (taskAlreadyExists) {
    alert("Ese título ya existe en la lista.");
    return;
  }

  clearError();
  setLoading(true);

  try {
    const newTask = await createTask({
      title: taskTitle,
      category: category,
      platform: platform,
      rating: rating,
    });

    tasks.push(newTask);
    renderTasks(newTask.id);

    taskInput.value = "";
    taskInput.focus();
  } catch (error) {
    showError(error.message || "No se pudo crear la tarea.");
  } finally {
    setLoading(false);
  }
}

/* Inicializar tareas */
/**
 * Inicializa la lista de tareas desde localStorage o desde el HTML inicial.
 */
function initTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = readGamesFromHtml();
    saveTasks();
  }

  hideOldHtmlGames();
}

/* Leer los juegos antiguos del HTML */
function readGamesFromHtml() {
  const articles = document.querySelectorAll(".default-game");
  const extractedGames = [];

  articles.forEach(function (article, index) {
    const titleElement = article.querySelector("h3");
    const spans = article.querySelectorAll("span");

    if (!titleElement || spans.length < 3) return;

    const title = titleElement.textContent.trim();
    const category = spans[0].textContent.trim();
    const platform = spans[1].textContent.trim();
    const rating = spans[2].textContent.trim();

    extractedGames.push({
      id: Date.now() + index,
      text: title,
      category: category,
      platform: platform,
      rating: rating,
      viewed: false,
    });
  });

  return extractedGames;
}

/* Ocultar catálogo antiguo del HTML */
function hideOldHtmlGames() {
  if (defaultGamesContainer) {
    defaultGamesContainer.style.display = "none";
  }
}

/* Guardar */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Borrar una con animación */
/**
 * Elimina una tarea por su id y aplica una animación si existe en el DOM.
 * @param {number} id
 */
async function deleteTask(id) {
  const article = taskList.querySelector(`[data-id="${id}"]`);

  if (!article) {
    try {
      await deleteTaskRequest(id);
      tasks = tasks.filter(function (task) {
        return task.id !== id;
      });
      renderTasks();
    } catch (error) {
      showError(error.message || "No se pudo eliminar la tarea.");
    }
    return;
  }

  article.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  article.style.opacity = "0";
  article.style.transform = "translateY(-10px)";

  setTimeout(async function () {
    try {
      await deleteTaskRequest(id);
      tasks = tasks.filter(function (task) {
        return task.id !== id;
      });
      renderTasks();
    } catch (error) {
      showError(error.message || "No se pudo eliminar la tarea.");
      article.style.opacity = "1";
      article.style.transform = "translateY(0)";
    }
  }, 250);
}

/* Editar título */
/**
 * Edita el título de una tarea existente.
 * @param {number} id
 */
function editTask(id) {
  const currentTask = tasks.find(function (task) {
    return task.id === id;
  });

  if (!currentTask) return;

  const updatedTitle = prompt("Editar título:", currentTask.title);

  if (updatedTitle === null) return;

  const sanitizedTitle = updatedTitle.trim();

  if (sanitizedTitle === "") {
    alert("El título no puede estar vacío.");
    return;
  }

  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        title: sanitizedTitle,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

/* Marcar una como vista */
/**
 * Cambia el estado visto/no visto de una tarea.
 * @param {number} id
 */
function toggleViewed(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        viewed: !task.viewed,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

/* Marcar todas como vistas */
function markAllAsViewed() {
  if (tasks.length === 0) return;

  tasks = tasks.map(function (task) {
    return {
      ...task,
      viewed: true,
    };
  });

  saveTasks();
  renderTasks();
}

/* Borrar todas */
function clearAllTasks() {
  if (tasks.length === 0) return;

  const userConfirmedDeletion = confirm("¿Seguro que quieres borrar todos los títulos?");
  if (!userConfirmedDeletion) return;

  tasks = [];
  saveTasks();
  renderTasks();
}

/* Clase de prioridad */
function getPriorityClass(priority) {
  const classes = {
    "Muy bueno": "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    "Bueno": "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
    "Medio": "rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-100"
  };
  return classes[priority] || "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100";
}
/**
 * Devuelve las tareas filtradas por texto de búsqueda y categoría seleccionada.
 * @returns {Array}
 */
function getFilteredTasks() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter ? statusFilter.value : "all";

  return tasks.filter(function (task) {
    const matchesSearch = task.title.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Todas" || task.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "viewed" && task.viewed) ||
      (selectedStatus === "pending" && !task.viewed);

    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function getSortedTasks(filteredTasks) {
  const sortedTasks = [...filteredTasks];
  const sortValue = sortSelect ? sortSelect.value : "default";

  if (sortValue === "title") {
    sortedTasks.sort(function (a, b) {
      return a.title.localeCompare(b.title, "es", { sensitivity: "base" });
    });
  }

  if (sortValue === "rating") {
    const ratingOrder = {
      "Muy bueno": 0,
      "Bueno": 1,
      "Medio": 2
    };

    sortedTasks.sort(function (a, b) {
      return ratingOrder[a.rating] - ratingOrder[b.rating];
    });
  }

  if (sortValue === "viewed") {
    sortedTasks.sort(function (a, b) {
      return Number(a.viewed) - Number(b.viewed);
    });
  }

  return sortedTasks;
}
/* Actualizar estadísticas */
function updateStats() {
  const totalTasks = tasks.length;
  const viewedTasks = tasks.filter(function (task) {
    return task.viewed;
  }).length;
  const pendingTasks = totalTasks - viewedTasks;

  if (totalCountEl) {
    totalCountEl.textContent = totalTasks;
  }

  if (viewedStatsCountEl) {
    viewedStatsCountEl.textContent = viewedTasks;
  }

  if (pendingCountEl) {
    pendingCountEl.textContent = pendingTasks;
  }
}
/* Pintar */
function renderTasks(highlightId = null) {
  taskList.innerHTML = "";
  updateStats();
  const filteredTasks = getFilteredTasks();
const sortedTasks = getSortedTasks(filteredTasks);

if (sortedTasks.length === 0) {
    taskList.innerHTML = `
      <p class="rounded-lg bg-slate-100 px-3 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        No hay títulos para mostrar.
      </p>
    `;
    return;
  }


  sortedTasks.forEach(function (task) {
    const article = document.createElement("article");
    article.dataset.id = task.id;
    article.className =
  "flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-md transition dark:bg-slate-900 dark:ring-slate-800 xl:flex-row xl:items-center xl:flex-wrap";
    
  if (task.viewed) {
      article.style.opacity = "0.75";
    } else {
      article.style.opacity = "1";
    }

    const titleStyle = task.viewed
      ? 'style="text-decoration: line-through; opacity: 0.85;"'
      : "";

    article.innerHTML = `
      <h3 class="mr-auto font-semibold" ${titleStyle}>
        ${task.title}
      </h3>

      <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
        ${task.category}
      </span>

      <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
        ${task.platform}
      </span>

      <span class="${getPriorityClass(task.rating)}">
        ${task.rating}
      </span>

      <button
        class="view-btn rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 transition"
        type="button"
      >
        ${task.viewed ? "Visto" : "Marcar visto"}
      </button>

      <button
        class="edit-btn rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 transition"
        type="button"
      >
        Editar
      </button>

      <button
        class="delete-btn rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        type="button"
      >
        Borrar
      </button>
    `;

    const viewButton = article.querySelector(".view-btn");
    const editButton = article.querySelector(".edit-btn");
    const deleteButton = article.querySelector(".delete-btn");

    viewButton.addEventListener("click", function () {
      toggleViewed(task.id);
    });

    editButton.addEventListener("click", function () {
      editTask(task.id);
    });

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    /* Animación al crear */
    if (highlightId === task.id) {
      article.style.opacity = "0";
      article.style.transform = "translateY(10px)";
      article.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    }

    taskList.appendChild(article);

    if (highlightId === task.id) {
      requestAnimationFrame(function () {
        if (task.viewed) {
          article.style.opacity = "0.75";
        } else {
          article.style.opacity = "1";
        }
        article.style.transform = "translateY(0)";
      });
    }
  });
}

/* Tema oscuro */
/**
 * Aplica el tema visual y lo guarda en localStorage.
 * @param {boolean} isDark
 */
function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

(function initTheme() {
  const saved = localStorage.getItem("theme");

  if (saved) {
    setTheme(saved === "dark");
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }

})();
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(!isDark);
  });
}


