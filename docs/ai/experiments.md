# Experimentos con IA

## Introducción
En este documento voy a registrar los experimentos realizados con herramientas de inteligencia artificial dentro del proyecto TaskFlow. Incluiré pruebas de generación de código, corrección de errores, propuestas de mejora y cualquier otro uso práctico que haya probado durante el desarrollo.

# Experimentos con IA en programación

## Objetivo

En esta práctica comparé la resolución de varios problemas de programación y tareas del proyecto usando dos enfoques: primero sin ayuda de IA y después con ayuda de IA. El objetivo fue analizar diferencias en tiempo invertido, calidad del código y comprensión del problema.

## Experimento 1: problemas pequeños de programación
### Problema 1: contar números pares en un array

**Objetivo:**  
Crear una función que reciba un array de números y devuelva cuántos de ellos son pares.

**Resolución sin IA:**  
Recorrer el array y comprobar cada número.
Si el número es divisible entre 2 y el resto es 0, entonces es par y se suma al contador.
Al final, devolver el total de números pares encontrados.
**Tiempo invertido sin IA:**  
20 minutos 
**Código sin IA:**
```js
function contarPares(array) {
  let contador = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      contador++;
    }
  }

  return contador;
}

// Ejemplo de uso
console.log(contarPares([1, 2, 3, 4, 5, 6])); // 3
```
**Resolución con IA:**
Después pedí a la IA una solución para contar números pares en un array con JavaScript. La IA propuso una versión más corta usando filter(), que resultó más limpia y fácil de leer.
**Tiempo invertido con IA:** 
1 o 2 minutos aproximadamente.
**Código con IA:**
```js
function countEvenNumbers(numbers) {
  return numbers.filter(function (number) {
    return number % 2 === 0;
  }).length;
}
```
### Comparación:

-   Tiempo: Con IA fue más rápido porque la solución apareció casi al instante.
-   Calidad del código: La versión con IA quedó más corta y legible, aunque la versión sin IA también era correcta.
-   Comprensión del problema: Resolverlo primero sin IA me ayudó a entender mejor la lógica antes de comparar otra alternativa.

### Problema 2: invertir una cadena de texto

**Objetivo:**  
Crear una función que reciba una cadena y devuelva esa misma cadena invertida.

**Resolución sin IA:**  
Tomar la cadena original, separar cada carácter, invertir el orden y volver a unirlos para formar una nueva cadena.
Otra forma sería recorrer la cadena desde el final hasta el inicio y construir una nueva.
**Tiempo invertido sin IA:**  
15 minutos
**Código sin IA:**
```js
function invertirCadena(texto) {
  return texto.split('').reverse().join('');
}

// Ejemplo de uso
console.log(invertirCadena("hola")); // "aloh"
```
**Resolución con IA:**  
Después pedí a la IA una solución para invertir una cadena de texto en JavaScript. La IA propuso usar `split()`, `reverse()` y `join()`, que es una forma más corta y fácil de leer que hacerlo con un bucle manual.

**Tiempo invertido con IA:**  
1 o 2 minutos aproximadamente.

**Código con IA:**
```js
function reverseText(text) {
  return text.split("").reverse().join("");
}
```
### Comparación:

-   Tiempo: Con IA fue más rápido porque la solución apareció de forma inmediata.
-   Calidad del código: La versión con IA quedó más compacta y legible.
-   Comprensión del problema: Resolverlo primero sin IA ayuda a entender mejor cómo funciona la inversión de cadenas antes de usar métodos más avanzados.

### Problema 3: eliminar elementos duplicados de un array

**Objetivo:**  
Crear una función que reciba un array y devuelva otro array sin elementos duplicados.

**Resolución sin IA:**  
Primero pensé en recorrer el array original e ir guardando los valores en un nuevo array solo si todavía no estaban incluidos. Para ello utilicé `includes()` dentro de un bucle.

**Tiempo invertido sin IA:**  
10 minutos aproximadamente.

**Código sin IA:**
```js
function removeDuplicates(items) {
  const result = [];

  for (let i = 0; i < items.length; i++) {
    if (!result.includes(items[i])) {
      result.push(items[i]);
    }
  }

  return result;
}
```
**Resolución con IA:**
Después pedí a la IA una solución para eliminar elementos duplicados de un array en JavaScript. La IA propuso usar Set, que permite obtener valores únicos de forma más directa y con menos código.

**Tiempo invertido con IA:**
1 o 2 minutos aproximadamente.

**Código con IA:**
```js
function removeDuplicates(items) {
  return [...new Set(items)];
}
```
### Comparación:

-   Tiempo: Con IA fue más rápido porque la solución apareció de forma inmediata.
-   Calidad del código: La versión con IA quedó más corta, moderna y fácil de leer.
-   Comprensión del problema: Resolverlo primero sin IA me ayudó a entender la lógica de eliminar duplicados antes de ver una solución más compacta.

## Experimento 2: tareas relacionadas con el proyecto
### Tarea 1: añadir validaciones al formulario de TaskFlow

**Objetivo:**  
Mejorar la validación del formulario para evitar títulos vacíos, demasiado cortos o duplicados.

**Resolución sin IA:**  
Primero pensé en revisar manualmente el valor del input antes de crear la tarea. Añadí una comprobación para evitar cadenas vacías, otra para exigir un mínimo de caracteres y una tercera para comprobar si ya existía una tarea con el mismo nombre.

**Tiempo invertido sin IA:**  
10 minutos aproximadamente.

**Código sin IA:**
```js
if (taskTitle === "") {
  alert("El título no puede estar vacío.");
  return;
}

if (taskTitle.length < 3) {
  alert("El título debe tener al menos 3 caracteres.");
  return;
}

const taskAlreadyExists = tasks.some(function (task) {
  return task.text.toLowerCase() === taskTitle.toLowerCase();
});

if (taskAlreadyExists) {
  alert("Ese título ya existe en la lista.");
  return;
}
```
**Resolución con IA:**
Después pedí a la IA ayuda para reforzar la validación del formulario. La IA propuso una solución muy parecida, con comprobaciones ordenadas y mensajes claros para cada caso

**Tiempo invertido con IA:**
1 o 2 minutos aproximadamente.

**Código con IA:**
```js
if (taskTitle === "") {
  alert("El título no puede estar vacío.");
  return;
}

if (taskTitle.length < 3) {
  alert("El título debe tener al menos 3 caracteres.");
  return;
}

const taskAlreadyExists = tasks.some(function (task) {
  return task.text.toLowerCase() === taskTitle.toLowerCase();
});

if (taskAlreadyExists) {
  alert("Ese título ya existe en la lista.");
  return;
}
```

### Comparación:

-   Tiempo: Con IA tardé menos porque la propuesta salió casi al instante.
-   Calidad del código: En ambos casos la solución fue correcta, pero con IA fue más rápido ordenar las validaciones.
-   Comprensión del problema: Hacerlo primero sin IA me ayudó a entender mejor qué casos había que controlar.

### Tarea 2: simplificar la función `getPriorityClass()` en TaskFlow

**Objetivo:**  
Refactorizar la función `getPriorityClass()` para que fuera más legible y fácil de mantener, sin cambiar su comportamiento.

**Resolución sin IA:**  
Primero pensé en mantener la lógica con varios `if`, pero reorganizando mejor el código. Después vi que una forma más clara era usar un objeto con las clases asociadas a cada prioridad y devolver la clase correspondiente o una clase por defecto.

**Tiempo invertido sin IA:**  
8 minutos aproximadamente.

**Código sin IA:**
```js
function getPriorityClass(priority) {
  const classes = {
    "Muy bueno": "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    "Bueno": "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
    "Medio": "rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-100"
  };

  return classes[priority] || "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100";
}
```

**Resolución con IA:**
Después pedí a la IA que simplificara la función manteniendo exactamente el mismo comportamiento. La IA propuso una versión basada en un objeto de equivalencias, que coincidía con la idea más limpia y mantenible.

**Tiempo invertido con IA:**
1 o 2 minutos aproximadamente.

**Código con IA:**
```js
function getPriorityClass(priority) {
  const classes = {
    "Muy bueno": "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    "Bueno": "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
    "Medio": "rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-100"
  };

  return classes[priority] || "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100";
}
```
### Comparación
-   Tiempo: Con IA fue bastante más rápido obtener una versión limpia.
-   Calidad del código: La solución con IA fue clara, compacta y fácil de ampliar en el futuro.
-   Comprensión del problema: Resolverlo antes sin IA me ayudó a entender por qué el objeto era mejor que varios if.

### Tarea 3: extraer la lógica de filtrado de `renderTasks()` a `getFilteredTasks()` en TaskFlow

**Objetivo:**  
Separar la lógica de filtrado de la función `renderTasks()` para que el código quedara más ordenado, reutilizable y fácil de mantener.

**Resolución sin IA:**  
Primero revisé la función `renderTasks()` y detecté que estaba haciendo demasiadas cosas a la vez. Decidí extraer la parte del buscador y del filtro por categoría a una función aparte llamada `getFilteredTasks()`, de forma que `renderTasks()` solo se encargara de pintar la interfaz.

**Tiempo invertido sin IA:**  
12 minutos aproximadamente.

**Código sin IA:**
```js
function getFilteredTasks() {
  const searchText = searchInput.value.toLowerCase();

  return tasks.filter(function (task) {
    const matchesSearch = task.text.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Todas" || task.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function renderTasks(highlightId = null) {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <p class="rounded-lg bg-slate-100 px-3 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        No hay títulos para mostrar.
      </p>
    `;
    return;
  }

  // resto del render...
}
```
**Resolución con IA:**
Después pedí a la IA que simplificara renderTasks() separando responsabilidades sin cambiar el comportamiento. La IA propuso extraer la lógica de filtrado a una función independiente, lo que coincidía con la mejora que yo había identificado.

**Tiempo invertido con IA:**
1 o 2 minutos aproximadamente.

**Código con IA:**
```js
function getFilteredTasks() {
  const searchText = searchInput.value.toLowerCase();

  return tasks.filter(function (task) {
    const matchesSearch = task.text.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Todas" || task.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function renderTasks(highlightId = null) {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <p class="rounded-lg bg-slate-100 px-3 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        No hay títulos para mostrar.
      </p>
    `;
    return;
  }

  // resto del render...
}
```
### Comparación:

-   Tiempo: Con IA fue más rápido encontrar una forma clara de dividir responsabilidades.
-   Calidad del código: La función quedó más limpia y fácil de mantener en ambos casos, aunque con IA llegué antes a una solución bien estructurada.
-   Comprensión del problema: Resolverlo primero sin IA me ayudó a detectar por qué renderTasks() era demasiado larga y qué parte convenía extraer.