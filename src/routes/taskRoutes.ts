import express from 'express';
import { authMiddleware } from '../utils/auth';
import {
  deleteTask,
  getTask,
  getTasks,
  postTask,
  putTask
} from '../controllers/taskController';

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for the logged-in user
router.get('/', getTasks);

// GET /api/tasks/:id - Get a task for the logged-in user
router.get('/:id', getTask);

// POST /api/tasks - Create a new task
router.post('/', postTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', putTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

export default router;
