const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 */
router.get('/', taskController.obtenerTareas);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - platform
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *                 example: Elden Ring
 *               category:
 *                 type: string
 *                 example: RPG
 *               platform:
 *                 type: string
 *                 example: PC
 *               rating:
 *                 type: string
 *                 example: Muy bueno
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', taskController.crearTarea);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: La tarea no existe
 */
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;