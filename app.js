const platformSelect = document.getElementById("platform-select");
const prioritySelect = document.getElementById("priority-select");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const defaultGamesContainer = document.getElementById("default-games");

const markAllViewedBtn = document.getElementById("mark-all-viewed-btn");
const clearAllBtn = document.getElementById("clear-all-btn");

let tasks = [];
let selectedCategory = "Todas";

/* Cargar datos */
initTasks();
renderTasks();

/* Formulario */
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  const category = categorySelect.value;
  const platform = platformSelect.value;
  const rating = prioritySelect.value;

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    platform: platform,
    rating: rating,
    viewed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks(newTask.id);

  taskInput.value = "";
  taskInput.focus();
});

/* Buscador */
searchInput.addEventListener("input", function () {
  renderTasks();
});

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

/* Inicializar tareas */
function initTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    hideOldHtmlGames();
    return;
  }

  tasks = readGamesFromHtml();
  saveTasks();
  hideOldHtmlGames();
}

/* Leer los juegos antiguos del HTML */
function readGamesFromHtml() {
  const articles = document.querySelectorAll(".default-game");
  const games = [];

  articles.forEach(function (article, index) {
    const titleElement = article.querySelector("h3");
    const spans = article.querySelectorAll("span");

    if (!titleElement || spans.length < 3) return;

    const title = titleElement.textContent.trim();
    const category = spans[0].textContent.trim();
    const platform = spans[1].textContent.trim();
    const rating = spans[2].textContent.trim();

    games.push({
      id: Date.now() + index,
      text: title,
      category: category,
      platform: platform,
      rating: rating,
      viewed: false,
    });
  });

  return games;
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
function deleteTask(id) {
  const article = taskList.querySelector(`[data-id="${id}"]`);

  if (!article) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });

    saveTasks();
    renderTasks();
    return;
  }

  article.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  article.style.opacity = "0";
  article.style.transform = "translateY(-10px)";

  setTimeout(function () {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });

    saveTasks();
    renderTasks();
  }, 250);
}

/* Editar título */
function editTask(id) {
  const taskToEdit = tasks.find(function (task) {
    return task.id === id;
  });

  if (!taskToEdit) return;

  const newTitle = prompt("Editar título:", taskToEdit.text);

  if (newTitle === null) return;

  const trimmedTitle = newTitle.trim();

  if (trimmedTitle === "") return;

  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        text: trimmedTitle,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

/* Marcar una como vista */
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

  const confirmed = confirm("¿Seguro que quieres borrar todos los títulos?");

  if (!confirmed) return;

  tasks = [];
  saveTasks();
  renderTasks();
}

/* Clase de prioridad */
function getPriorityClass(priority) {
  if (priority === "Muy bueno") {
    return "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100";
  }

  if (priority === "Bueno") {
    return "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100";
  }

  if (priority === "Medio") {
    return "rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-100";
  }

  return "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100";
}

/* Pintar */
function renderTasks(highlightId = null) {
  taskList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(function (task) {
    const matchesSearch = task.text.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Todas" || task.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <p class="rounded-lg bg-slate-100 px-3 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        No hay títulos para mostrar.
      </p>
    `;
    return;
  }

  filteredTasks.forEach(function (task) {
    const article = document.createElement("article");
    article.dataset.id = task.id;
    article.className =
      "flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-md transition dark:bg-slate-900 dark:ring-slate-800 sm:flex-row sm:items-center";

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
        ${task.text}
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