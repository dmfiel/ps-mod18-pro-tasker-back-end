import express from 'express';
import { authMiddleware } from '../utils/auth';
import {
  deleteProject,
  getProject,
  getProjects,
  getProjectTasks,
  postProject,
  postProjectTask,
  putProject
} from '../controllers/projectController';

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/project - Get all projects for the logged-in user
router.get('/', getProjects);

// GET /api/project - Get a project for the logged-in user
router.get('/:id', getProject);

// POST /api/project - Create a new project
router.post('/', postProject);

// PUT /api/project/:id - Update a project
router.put('/:id', putProject);

// DELETE /api/project/:id - Delete a project
router.delete('/:id', deleteProject);

// GET /api/project/:projectId/tasks - Get all tasks for a given project
router.get('/:id/tasks', getProjectTasks);

// POST /api/project/:projectId/tasks - Create a task for a given project
router.post('/:id/tasks', postProjectTask);

export default router;
