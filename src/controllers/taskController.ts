import express from 'express';
import { isEmpty } from '../utils/isEmpty';
import Task from '../models/Task';
import Project from '../models/Project';

// GET /api/tasks - Get all tasks for the logged-in user
export async function getTasks(req: express.Request, res: express.Response) {
  try {
    const projects = await Project.find({ owner: req.user._id });
    console.log(projects);
    if (!projects || projects.length === 0)
      return res.status(400).json({ message: 'No tasks found' });
    const tasks = await Task.find({
      $or: projects.map(project => ({ project: project._id }))
    });

    if (!tasks || tasks.length === 0)
      return res.status(400).json({ message: 'No tasks found' });

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// GET /api/tasks/:id - Get a task for the logged-in user
export async function getTask(req: express.Request, res: express.Response) {
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
}

// POST /api/tasks - Create a new task
export async function postTask(req: express.Request, res: express.Response) {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
}

// PUT /api/tasks/:id - Update a task
export async function putTask(req: express.Request, res: express.Response) {
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
}

// DELETE /api/tasks/:id - Delete a task
export async function deleteTask(req: express.Request, res: express.Response) {
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
}
