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

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    platform: platformSelect.value,
    rating: prioritySelect.value
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
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
      rating: rating
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

/* Borrar */
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

/* Estilos valoración */
function getPriorityClass(priority) {
    if (priority === "Alta") {
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-100";
    }
  
    if (priority === "Media") {
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100";
    }
  
    if (priority === "Baja") {
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100";
    }
  
    if (priority === "Muy bueno") {
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100";
    }
  
    if (priority === "Bueno") {
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100";
    }
  
    if (priority === "Medio") {
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-100";
    }
  
    return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100";
  }

/* Pintar */
function renderTasks() {
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
    article.className =
      "flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:flex-row sm:items-center";

    article.innerHTML = `
      <h3 class="mr-auto font-semibold">${task.text}</h3>

      <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
        ${task.category}
      </span>

      <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
        ${task.platform}
      </span>

     <span class="rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(task.rating)}">
        ${task.rating}
    </span>

      <button class="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition">
        Borrar
      </button>
    `;

    const deleteButton = article.querySelector("button");

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    taskList.appendChild(article);
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