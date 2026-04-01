# Flujo de trabajo con Cursor

## Introducción
En este documento voy a explicar cómo he utilizado Cursor como IDE asistido por inteligencia artificial durante el desarrollo de TaskFlow. Describiré las tareas en las que me ha ayudado, cómo ha encajado en mi flujo de trabajo y qué ventajas o limitaciones he encontrado.

## Conectar servidores MCP

### Qué es MCP

El **Model Context Protocol (MCP)** es un estándar abierto que permite conectar asistentes de IA con fuentes de datos, herramientas y servicios externos mediante una interfaz común. Su objetivo es que la IA pueda trabajar con contexto real del proyecto, como archivos, repositorios o APIs, sin depender solo del texto que se copie manualmente en el chat. 

### Configuración de MCP en Cursor

Para esta práctica utilicé Cursor, que permite añadir servidores MCP personalizados desde su configuración. En mi caso, accedí a la opción **Add custom MCP**, que abrió el archivo `mcp.json`, donde se define la configuración del servidor. Cursor documenta soporte para MCP y configuración de servidores personalizados. 

### Instalación del servidor MCP filesystem paso a paso

1. Abrí Cursor y entré en la configuración de MCP.
2. Seleccioné la opción **Add custom MCP**.
3. Se abrió el archivo `mcp.json`.
4. Añadí la configuración del servidor `filesystem`.
5. Usé `npx` como comando.
6. Añadí como argumentos:
   - `-y`
   - `@modelcontextprotocol/server-filesystem`
   - la ruta local del proyecto
7. Guardé el archivo.
8. Reinicié Cursor o recargué la configuración.
9. Probé varias consultas en el chat para comprobar que el servidor podía acceder a los archivos del proyecto.

La configuración utilizada fue esta:


{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\Carlos\\Desktop\\taskflow-project"
      ]
    }
  }
}
### Comprobación de funcionamiento

Una vez configurado el servidor, comprobé que funcionaba correctamente pidiendo a la IA que accediera a información real del proyecto. El servidor pudo listar archivos principales, leer contenido de `app.js`, revisar `index.html`, analizar `tailwind.config.js` y comparar la relación entre la estructura HTML y la lógica JavaScript.

### Consultas realizadas con MCP

Durante la prueba realicé al menos cinco consultas distintas:

1. **Listar los archivos principales del proyecto.**
2. **Leer `app.js` y resumir sus funciones principales.**
3. **Leer `index.html` y resumir la estructura principal de la interfaz.**
4. **Revisar `tailwind.config.js` y explicar la configuración del modo oscuro.**
5. **Comparar `index.html` y `app.js` para entender cómo se conectan los elementos del DOM con la lógica JavaScript.**

### Utilidad de MCP en proyectos reales

MCP puede ser muy útil en proyectos reales porque permite que la IA acceda directamente a archivos, carpetas y herramientas externas sin tener que copiar y pegar toda la información manualmente. Esto ahorra tiempo, mejora el análisis del proyecto y facilita trabajar con repositorios grandes o con varios archivos relacionados. También puede servir para conectar la IA con servicios como GitHub, documentación interna o bases de datos.

En este proyecto, el servidor MCP `filesystem` fue útil para leer `app.js`, revisar `index.html`, comprobar la configuración de Tailwind y entender cómo se conectan la interfaz y la lógica de la aplicación.