# Prompt Engineering

## Introducción
En este documento voy a recoger los prompts utilizados durante las pruebas con herramientas de IA, analizando cómo cambia el resultado según la forma de preguntar. Incluiré ejemplos de prompts más generales y más precisos, así como conclusiones sobre cuáles funcionan mejor para programar, depurar y documentar.

## Tipos de prompts probados

En esta práctica probé distintos enfoques de prompt engineering aplicados al desarrollo del proyecto TaskFlow:

##  prompts con definición de rol
### Prompt 1 — Rol de desarrollador senior para revisar código

**Prompt:**
Actúa como un desarrollador senior de JavaScript. Revisa esta función de TaskFlow, detecta problemas de legibilidad, validación o mantenimiento y propón una versión mejorada sin cambiar su comportamiento.

Uso en el proyecto:
Lo utilicé para revisar funciones del archivo app.js, especialmente en tareas de refactorización.

Por qué funciona bien:
Funciona bien porque asigna un rol concreto a la IA y orienta la respuesta hacia revisión técnica, buenas prácticas y mantenimiento. En lugar de dar una respuesta genérica, la IA tiende a centrarse en calidad de código, claridad y posibles mejoras reales.

##  prompts con ejemplos previos (few-shot prompting)
###  Prompt 2 — Rol de revisor técnico para documentación
**Prompt**
Actúa como un revisor técnico y ayúdame a redactar documentación clara y ordenada para este cambio del proyecto, con tono académico y fácil de entender.

Uso en el proyecto:
Lo utilicé para redactar partes de la documentación en docs/ai.

Por qué funciona bien:
Funciona bien porque fija el tono y el tipo de salida esperada. La IA responde de forma más estructurada, más clara y más útil para un documento de entrega.

- prompts pidiendo razonamiento paso a paso
- prompts con restricciones claras en la respuesta

También utilicé estos prompts para generar código, refactorizar funciones y documentar partes del proyecto.

## Prompts con ejemplos previos (few-shot prompting)

### Prompt 3 — Generar funciones siguiendo un estilo dado

**Prompt:**
Te doy dos ejemplos del estilo que quiero en mis funciones JavaScript:

Ejemplo 1:
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

Ejemplo 2:
function hideOldHtmlGames() {
  if (defaultGamesContainer) {
    defaultGamesContainer.style.display = "none";
  }
}

Ahora genera una nueva función para TaskFlow que cuente cuántas tareas están marcadas como vistas, manteniendo el mismo estilo de código.

Uso en el proyecto:
Lo utilicé para pedir funciones nuevas manteniendo el estilo ya existente en app.js.

Por qué funciona bien:
Funciona bien porque no solo pide un resultado, sino que enseña a la IA el formato, la complejidad y el estilo esperado. Eso hace que la respuesta encaje mejor con el proyecto

## Prompt 4 — Refactorizar siguiendo un ejemplo concreto
**Prompt:**
Quiero que refactorices esta función siguiendo este ejemplo de estilo:

Ejemplo de estilo deseado:
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

Ahora aplica ese mismo nivel de claridad y simplicidad a esta otra función, sin cambiar su comportamiento.

Uso en el proyecto:
Lo utilicé para pedir refactors con una referencia clara del tipo de resultado que quería obtener.

Por qué funciona bien:
Funciona bien porque reduce la ambigüedad. En vez de pedir “mejóralo” de forma vaga, doy un ejemplo concreto del estilo final esperado.

## Prompts con razonamiento paso a paso

### Prompt 5 — Analizar una función paso a paso

**Prompt:**
```text
Analiza esta función paso a paso. Explica qué hace cada bloque, qué datos usa, qué resultado produce y qué partes podrían mejorarse sin cambiar su comportamiento.
## Prompts con razonamiento paso a paso

