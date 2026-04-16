# Herramientas y conceptos del backend API

## Axios

Axios es una librería de JavaScript que se utiliza para hacer peticiones HTTP desde el frontend o desde Node.js. Sirve para comunicarse con APIs y enviar o recibir datos de forma asíncrona.

Se usa porque facilita mucho las peticiones de red, ya que permite trabajar con promesas, configurar cabeceras, enviar datos en formato JSON y manejar errores de forma más cómoda que con otras opciones.

En proyectos reales se utiliza para consumir APIs, conectar frontend y backend, enviar formularios o trabajar con servicios externos.

## Postman

Postman es una herramienta que permite probar APIs sin necesidad de construir primero una interfaz gráfica. Con ella se pueden enviar peticiones HTTP como `GET`, `POST`, `PUT`, `PATCH` o `DELETE` y ver la respuesta del servidor.

Se usa porque ayuda a comprobar si una API funciona correctamente, validar respuestas, revisar códigos de estado y detectar errores antes de conectar el backend con el frontend.

En este tipo de proyectos resulta muy útil para probar endpoints de forma manual, por ejemplo al crear, consultar o eliminar tareas.

## Sentry

Sentry es una plataforma de monitorización de errores y rendimiento. Se utiliza para registrar fallos que ocurren en una aplicación, tanto en frontend como en backend, y poder analizarlos después.

Se usa porque permite detectar errores reales en producción, guardar información sobre dónde ocurrieron y ayudar a encontrar su causa. También puede avisar cuando un fallo se repite muchas veces o afecta a muchos usuarios.

En proyectos reales se utiliza para supervisar aplicaciones ya desplegadas y reaccionar más rápido cuando aparece un problema.

## Swagger

Swagger es un conjunto de herramientas que se usa para documentar y describir APIs REST. Permite definir de forma clara qué endpoints existen, qué datos reciben, qué respuestas devuelven y cómo debe usarse cada ruta.

Se usa porque facilita la documentación técnica de una API y ayuda a que otros desarrolladores entiendan rápidamente cómo consumirla. Además, en muchos casos permite generar una interfaz visual para probar los endpoints.

En proyectos reales es muy útil cuando una API va a ser utilizada por otras personas, otros equipos o incluso otras aplicaciones.

## Conclusión

Axios, Postman, Sentry y Swagger son herramientas muy habituales en el desarrollo backend y en el trabajo con APIs. Cada una cumple una función distinta:

- **Axios** ayuda a consumir APIs desde código
- **Postman** ayuda a probar APIs manualmente
- **Sentry** ayuda a detectar y registrar errores
- **Swagger** ayuda a documentar APIs de forma clara

Conocer estas herramientas es importante porque forman parte del flujo de trabajo real en proyectos profesionales.