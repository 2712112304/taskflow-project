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

