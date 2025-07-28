import express from 'express';
import { authMiddleware } from '../utils/auth';
import { isEmpty } from '../utils/isEmpty';
import Task from '../models/Task';
import Project from '../models/Project';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for the logged-in user
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    // const tasks = await Task.find()
    //   .populate({
    //     path: 'project',
    //     match: { owner: req.user._id }
    //   })
    //   .then(tasks => tasks.filter(task => task.project));
    // task.project === null when no match found
    // the above works, but it is inefficient, since it retrieves all tasks, joins with projects, and then filters by owner id
    // The below solution gets the matching projects first, then queries the tasks with matching project ids.
    // An even better solution would be to use .aggregate to do a server-side join:
    // https://stackoverflow.com/questions/11303294/querying-after-populate-in-mongoose

    const projects = await Project.find({ owner: req.user._id });
    console.log(projects);
    if (!projects || projects.length === 0)
      return res.status(400).json({ message: 'No tasks found' });
    const tasks = await Task.find({
      $or: projects.map(project => ({ project: project._id }))
    });
    // { $or, [
    //   { project: new ObjectId('6881618331f4467716f63ec6') },
    //   { project: new ObjectId('6881618331f4467716f63ec0') }
    // ] }
    if (!tasks || tasks.length === 0)
      return res.status(400).json({ message: 'No tasks found' });

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/tasks - Get task for the logged-in user
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (isEmpty(task))
      return res
        .status(404)
        .json({ message: `No task found for id (${req.params.id}).` });
    // if (task.owner.toString() !== req.user._id)
    //   return res
    //     .status(403)
    //     .json({ message: 'You are now allowed to see that task.' });

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    let task = await Task.findById(req.params.id);
    if (isEmpty(task))
      return res
        .status(404)
        .json({ message: `No task found for id (${req.params.id}).` });

    const projectId = task.project;
    const project = await Project.findById(projectId);
    if (!project || isEmpty(project) || !project.owner)
      return res
        .status(404)
        .json({ message: `No project found for id (${projectId}).` });
    if (project.owner.toString() !== req.user._id)
      return res
        .status(403)
        .json({ message: 'You are not allowed to update that project.' });

    task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found for id (${req.params.id}).` });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    let task = await Task.findById(req.params.id);

    if (isEmpty(task))
      return res
        .status(404)
        .json({ message: `No task found for id (${req.params.id}).` });

    const projectId = task.project;
    const project = await Project.findById(projectId);
    if (!project || isEmpty(project) || !project.owner)
      return res
        .status(404)
        .json({ message: `No project found for id (${projectId}).` });
    if (project.owner.toString() !== req.user._id)
      return res
        .status(403)
        .json({ message: 'You are not allowed to update that project.' });

    task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found for id (${req.params.id}).` });
    }

    res.json({ message: 'Task deleted' }, task);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
