## Descripción de `index.html`

El archivo `index.html` define la estructura principal de la interfaz de la aplicación TaskFlow. En él se organizan los distintos bloques visuales del proyecto, incluyendo la cabecera, el panel lateral, el formulario de entrada y el contenedor donde se muestran dinámicamente los títulos.

Su función principal es servir de base a la interfaz gráfica, proporcionando los elementos del DOM que posteriormente son manipulados desde `app.js`.

### Elementos principales

- **Cabecera** con el nombre de la aplicación y el botón de cambio de tema.
- **Panel lateral** con los filtros por género y el panel de estadísticas.
- **Formulario principal** para añadir nuevos títulos.
- **Zona de búsqueda y ordenación** para gestionar la visualización de los títulos.
- **Lista de títulos** renderizada dinámicamente con JavaScript.
- **Catálogo inicial en HTML**, utilizado como fuente de datos en la primera carga.

---

## Descripción de `app.js`

El archivo `app.js` contiene toda la lógica funcional de la aplicación. Se encarga de gestionar el comportamiento de la interfaz, el estado de los títulos, la persistencia de datos y la interacción del usuario con los distintos controles.

Su propósito es conectar la estructura definida en `index.html` con la lógica de negocio del proyecto, permitiendo añadir, editar, eliminar, filtrar, ordenar y visualizar los títulos de forma dinámica.

### Funcionalidades principales gestionadas en `app.js`

- Inicialización de datos desde `localStorage` o desde el catálogo HTML inicial.
- Gestión del formulario de creación de títulos.
- Validación de datos introducidos por el usuario.
- Edición y eliminación de títulos.
- Cambio de estado de los títulos a visto o pendiente.
- Filtrado por texto, género y estado.
- Ordenación de títulos según distintos criterios.
- Actualización automática de estadísticas.
- Renderizado dinámico de la lista.
- Gestión del modo oscuro.

### Persistencia

La aplicación utiliza `localStorage` para guardar los datos del usuario y conservarlos entre recargas de página.

### Relación entre ambos archivos

`index.html` aporta la estructura visual y los elementos de interfaz, mientras que `app.js` aporta la lógica que permite interactuar con ellos y mantener actualizada la aplicación.