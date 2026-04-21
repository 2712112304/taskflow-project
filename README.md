# TaskFlow Project

Aplicación web para gestionar una biblioteca de videojuegos de forma sencilla, visual y responsive. Permite añadir títulos, clasificarlos, buscarlos, ordenarlos, marcarlos como vistos y administrarlos desde una interfaz clara conectada a un backend con Express.

## Demo

Frontend desplegado:  
https://taskflow-project-xi.vercel.app/

## Funcionalidades

- **Añadir títulos** — Crea nuevos videojuegos con título, género, plataforma y valoración
- **Editar títulos** — Modifica el nombre de cualquier videojuego existente
- **Eliminar títulos** — Borra títulos individuales o vacía toda la lista
- **Marcar como visto** — Cambia el estado de un título a visto o pendiente
- **Filtro por género** — Filtra los videojuegos desde el panel lateral
- **Ordenación** — Ordena los títulos por nombre, prioridad o estado
- **Búsqueda en tiempo real** — Encuentra videojuegos mientras escribes
- **Panel de estadísticas** — Consulta el total de títulos, vistos y pendientes
- **Modo oscuro/claro** — Cambia la apariencia de la aplicación
- **API REST con Express** — El frontend consume datos desde un backend propio
- **Estados de red en la interfaz** — Muestra carga, éxito y error al comunicarse con la API

## Categorías disponibles

| Categoría | Descripción |
|----------|-------------|
| Shooter | Juegos de acción y disparos |
| RPG | Juegos de rol y progresión |
| Aventura | Juegos narrativos y de exploración |
| Carreras | Juegos de conducción y velocidad |

##  Ejemplos de uso
### Añadir un videojuego
1.  Escribe el título en el campo principal
2.  Selecciona género, plataforma y valoración
3.  Pulsa Añadir
### Buscar un título
1.  Escribe parte del nombre en el buscador
2.  La lista se filtra automáticamente
### Ordenar títulos
1.  Usa el selector Ordenar por
2.  Puedes ordenar por título, prioridad o estado
### Filtrar por género
1.  Pulsa uno de los botones del panel lateral
2.  Solo se mostrarán los títulos de esa categoría
### Marcar como visto
1.  Pulsa el botón Marcar visto
2.  El título cambiará visualmente y se actualizarán las estadísticas

##  Estructura del proyecto
taskflow-project/
├── index.html
├── app.js
├── output.css
├── tailwind.config.js
├── README.md
├── src/
│   ├── input.css
│   └── api/
│       └── client.js
├── server/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       ├── config/
│       │   └── env.js
│       ├── controllers/
│       │   └── task.controller.js
│       ├── routes/
│       │   └── task.routes.js
│       └── services/
│           └── task.service.js
└── docs/
    └── ai/
        ├── ai-comparison.md
        ├── cursor-workflow.md
        ├── prompt-engineering.md
        ├── experiments.md
        └── reflection.md

        | Tecnología      | Uso                                   |
| --------------- | ------------------------------------- |
| HTML5           | Estructura de la aplicación           |
| Tailwind CSS    | Estilos y diseño responsive           |
| JavaScript ES6+ | Lógica del frontend                   |
| Node.js         | Entorno de ejecución del backend      |
| Express         | API REST                              |
| CORS            | Comunicación entre frontend y backend |
| Dotenv          | Variables de entorno                  |
| Nodemon         | Desarrollo del servidor               |
| Fetch API       | Consumo de la API desde el cliente    |
| Vercel          | Despliegue del frontend               |

## Pruebas de errores con Thunder Client

### Error 400
Se realizó una petición `POST /api/v1/tasks` enviando un título vacío.  
La API respondió con `400 Bad Request` y un mensaje indicando que el título es obligatorio y debe tener al menos 3 caracteres.

### Error 404
Se realizó una petición `DELETE /api/v1/tasks/123456789` con un identificador inexistente.  
La API respondió con `404 Not Found` y el mensaje `La tarea no existe.`

### Error 500
Se creó temporalmente una ruta `/error-test` que lanza un error no controlado mediante `next(new Error('ERROR_TEST'))`.  
La API respondió con `500 Internal Server Error` y un mensaje genérico: `Error interno del servidor`.