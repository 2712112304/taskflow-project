# Flujo de trabajo con Cursor

## Introducción
En este documento voy a explicar cómo he utilizado Cursor como IDE asistido por inteligencia artificial durante el desarrollo de TaskFlow. Describiré las tareas en las que me ha ayudado, cómo ha encajado en mi flujo de trabajo y qué ventajas o limitaciones he encontrado.

## Explicación de código

## Explicación de código existente

Probé Cursor pidiéndole que explicara paso a paso la función `renderTasks(highlightId = null)` de `app.js`.

Cursor explicó correctamente los puntos principales:
- limpia `taskList`
- lee el texto del buscador
- filtra las tareas por texto y categoría
- muestra un mensaje si no hay resultados
- crea un `article` por cada tarea
- añade botones y eventos
- aplica una animación cuando `highlightId` coincide

La respuesta fue clara y útil para entender cómo funciona el renderizado de tareas.

## Prueba de edición inline

Después probé la edición inline con una función pequeña y mejorable: `getPriorityClass(priority)`.

Seleccioné esa función y usé la edición inline para darle esta instrucción:

> Simplifica esta función para que sea más legible, manteniendo exactamente el mismo comportamiento.

Con esta prueba comprobé que Cursor puede refactorizar una parte concreta del código sin cambiar su resultado, haciendo la función más clara y fácil de leer.

## Prueba de autocompletado

También probé el autocompletado escribiendo un comentario al final del archivo:

app.js 

//  función que devuelve cuántas tareas están marcadas como vistas

A partir de ese comentario, Cursor generó una función útil para contar las tareas vistas. El código generado era correcto y cumplía con lo que pedía el comentario.

No hubo cambios visibles en la página porque era solo una función de prueba y no estaba conectada a la interfaz.

## Prueba de Agent / Composer

En mi versión de Cursor, Composer aparecía integrado como Agent. Lo utilicé para probar cambios que afectaran a varios archivos del proyecto.

Le di una instrucción para añadir un contador visible de tareas vistas en la interfaz. Cursor entendió la petición y modificó dos archivos:

-   index.html
-   app.js

Los cambios realizados fueron:

-   en index.html, añadió un bloque con id="viewed-count" para mostrar el contador
-   en app.js, añadió la referencia al elemento del DOM
-   creó una función updateViewedCount()
-   hizo que el contador se actualizara dentro de renderTasks()

El resultado fue correcto, ya que el contador se actualiza automáticamente cada vez que se vuelve a renderizar la lista.

### Conclusión

Las pruebas con Cursor fueron útiles para comprobar distintas formas de asistencia dentro del IDE. La herramienta sirvió para explicar código existente, mejorar funciones concretas con edición inline, generar código a partir de comentarios mediante autocompletado y aplicar cambios coordinados en varios archivos usando Agent. En general, la experiencia fue positiva y ayudó a agilizar tareas de comprensión, refactorización y ampliación del proyecto.

