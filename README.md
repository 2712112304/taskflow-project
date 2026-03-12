# Taskflow Project
## Diseño de la aplicación

Antes de comenzar el desarrollo de TaskFlow, se realizó un wireframe sencillo para planificar la estructura de la interfaz.

La aplicación está organizada en tres secciones principales:

- **Cabecera**: muestra el nombre de la aplicación.
- **Formulario**: permite escribir y añadir nuevas tareas.
- **Lista de titulos**: muestra los titulos creados .


El usuario podrá realizar las siguientes acciones:
Añadir nuevos títulos de videojuegos
-   Seleccionar género
-   Seleccionar plataforma
-   Asignar una valoración
-   Buscar títulos con el buscador
-   Editar el título de un juego
-   Marcar un juego como visto
-   Marcar todos los juegos como vistos
-   Eliminar un título individual
-   Borrar todos los títulos
-   Cambiar entre modo claro y modo oscuro

El diseño inicial se ha guardado en la carpeta `docs/design`.

**Testing manual de la aplicación**
1. Prueba con la lista vacía

Acción: Abrir la aplicación sin títulos guardados.
Resultado: La lista aparece vacía y la interfaz se muestra correctamente sin errores.

2. Añadir una tarea sin título

Acción: Intentar añadir un título sin escribir texto.
Resultado: La aplicación no permite añadir el elemento porque el campo está vacío.

3. Añadir un título muy largo

Acción: Añadir un videojuego con un nombre muy largo.

Ejemplo:

The Legend of Zelda Breath of the Wild Complete Edition Deluxe Remastered Version

Resultado: El título se muestra correctamente en la lista sin romper el diseño.

4. Marcar varias tareas como completadas

Acción: Marcar varios títulos como vistos usando el botón correspondiente.
Resultado: Los títulos aparecen tachados y con menor opacidad indicando que han sido completados.

5. Eliminar varias tareas

Acción: Eliminar varios títulos utilizando el botón Borrar.
Resultado: Los elementos desaparecen correctamente de la lista.

6. Recargar la página

Acción: Recargar el navegador después de añadir o modificar títulos.
Resultado: Los títulos se mantienen porque los datos se guardan en localStorage.