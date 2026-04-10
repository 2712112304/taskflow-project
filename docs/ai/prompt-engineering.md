# Prompt Engineering

## Introducción
En este documento voy a recoger los prompts utilizados durante las pruebas con herramientas de IA, analizando cómo cambia el resultado según la forma de preguntar. Incluiré ejemplos de prompts más generales y más precisos, así como conclusiones sobre cuáles funcionan mejor para programar, depurar y documentar.

## Tipos de prompts probados

En esta práctica probé distintos enfoques de prompt engineering aplicados al desarrollo del proyecto TaskFlow:

##  prompts con definición de rol
### Prompt 1 — Rol de desarrollador senior para revisar código

**Prompt:**
```text
Actúa como un desarrollador senior de JavaScript. Revisa esta función de TaskFlow, detecta problemas de legibilidad, validación o mantenimiento y propón una versión mejorada sin cambiar su comportamiento.
```
Uso en el proyecto:
Lo utilicé para revisar funciones del archivo app.js, especialmente en tareas de refactorización.

Por qué funciona bien:
Funciona bien porque asigna un rol concreto a la IA y orienta la respuesta hacia revisión técnica, buenas prácticas y mantenimiento. En lugar de dar una respuesta genérica, la IA tiende a centrarse en calidad de código, claridad y posibles mejoras reales.

##  prompts con ejemplos previos (few-shot prompting)
###  Prompt 2 — Rol de revisor técnico para documentación
**Prompt**
```text
Actúa como un revisor técnico y ayúdame a redactar documentación clara y ordenada para este cambio del proyecto, con tono académico y fácil de entender.
```
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
```text
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
```

Uso en el proyecto:
Lo utilicé para pedir funciones nuevas manteniendo el estilo ya existente en app.js.

Por qué funciona bien:
Funciona bien porque no solo pide un resultado, sino que enseña a la IA el formato, la complejidad y el estilo esperado. Eso hace que la respuesta encaje mejor con el proyecto

## Prompt 4 — Refactorizar siguiendo un ejemplo concreto
**Prompt:**
```text
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
``` 

Uso en el proyecto:
Lo utilicé para pedir refactors con una referencia clara del tipo de resultado que quería obtener.

Por qué funciona bien:
Funciona bien porque reduce la ambigüedad. En vez de pedir “mejóralo” de forma vaga, doy un ejemplo concreto del estilo final esperado.

## Prompts con razonamiento paso a paso

### Prompt 5 — Analizar una función paso a paso

**Prompt:**
```text
Analiza esta función paso a paso. Explica qué hace cada bloque, qué datos usa, qué resultado produce y qué partes podrían mejorarse sin cambiar su comportamiento.
```
Uso en el proyecto:
Lo utilicé para entender mejor funciones como renderTasks() y otras partes del archivo app.js antes de refactorizarlas.

Por qué funciona bien:
Funciona bien porque obliga a la IA a descomponer la respuesta en partes más pequeñas y comprensibles. Esto ayuda mucho cuando una función es larga o mezcla varias responsabilidades.

## Prompt 6 — Resolver un problema razonando antes de proponer cambios

**Prompt:**
```text
Antes de proponer una solución, razona paso a paso qué está fallando en este código, qué posibles causas hay y cuál sería la corrección más segura.
``` 

Uso en el proyecto:
Lo utilicé cuando aparecieron errores o comportamientos inesperados, por ejemplo al revisar validaciones o el modo oscuro.

Por qué funciona bien:
Funciona bien porque hace que la IA no salte directamente a una respuesta apresurada. Primero analiza el problema y luego propone una solución más razonada y útil.

## Prompt 7 — Explicar la relación entre varios archivos

**Prompt:**
```text
Explica paso a paso cómo se conectan estos archivos del proyecto, qué papel tiene cada uno y cómo fluye la información entre ellos.
```

Uso en el proyecto:
Lo utilicé para entender mejor la relación entre index.html, app.js, tailwind.config.js y los archivos CSS.

Por qué funciona bien:
Funciona bien porque ayuda a construir una visión global del proyecto y no solo de un archivo aislado. Es especialmente útil cuando se trabaja con frontend y varios ficheros relacionados.

## Prompts con restricciones claras en la respuesta

### Prompt 8 — Refactorizar con límites concretos

**Prompt:**
```text
Refactoriza esta función sin cambiar su comportamiento, sin usar librerías externas, manteniendo nombres comprensibles y devolviendo una solución compatible con JavaScript vanilla.
```
Uso en el proyecto:
Lo utilicé para refactorizar funciones de app.js sin introducir dependencias nuevas ni cambios innecesarios en la estructura del proyecto.

Por qué funciona bien:
Funciona bien porque define límites claros. La IA sabe qué puede hacer y qué no, así que la respuesta suele ser más útil, más realista y más fácil de integrar en el proyecto.

## Prompt 9 — Documentar con formato y tono concretos

**Prompt:**
```text
Documenta esta función con un comentario JSDoc breve, claro y correcto. No inventes comportamiento que no exista y mantén un tono técnico sencillo.
```
Uso en el proyecto:
Lo utilicé para generar comentarios JSDoc en funciones como editTask, deleteTask o setTheme.

Por qué funciona bien:
Funciona bien porque restringe el formato de salida y evita respuestas demasiado largas o inventadas. Eso mejora mucho la calidad de la documentación generada.

## Prompt 10 — Respuesta breve y estructurada

**Prompt:**
```text
Responde en un máximo de 5 líneas, con lenguaje claro y sin usar tecnicismos innecesarios. Explica qué hace esta función y por qué podría mejorarse.
```
Uso en el proyecto:
Lo utilicé cuando necesitaba explicaciones rápidas para entender una función sin recibir una respuesta demasiado larga.

Por qué funciona bien:
Funciona bien porque limita la longitud y obliga a la IA a priorizar la información más importante. Es útil para estudiar el código sin perder tiempo en explicaciones excesivas.

## Conclusión

Esta práctica me permitió comprobar que la calidad de la respuesta de la IA depende mucho de cómo se formula el prompt. Los prompts más útiles fueron los que definían claramente un rol, daban ejemplos del estilo esperado, pedían razonamiento paso a paso o imponían restricciones concretas en la respuesta. En el contexto del proyecto TaskFlow, estos enfoques fueron especialmente útiles para refactorizar funciones, documentar el código y entender mejor la estructura del proyecto.