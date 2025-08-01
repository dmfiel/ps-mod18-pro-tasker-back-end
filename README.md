# Pro Tasker - Project Management

This project provides a full-stack application for project and task management, Pro Tasker. This API is the engine that powers the entire application, handling user accounts, project management, and individual tasks. It provides a real-world, secure, and functional RESTful API with user-level authentication and authorization to keep information private.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The API provides secure row-level authenticated endpoints to allow clients to:

Manage Users:

- POST /api/users/register
  - Register to create a new user, ensuring the password gets hashed securely.
- POST /api/users/login
  - Login to find a user by their email, compare the provided password with the stored hash, and, if successful, generate and return a signed JSON Web Token (JWT).

Manage Projects:

- POST /api/projects
  - Create a new project assigned as owned by the current user.
- GET /api/projects
  - Get all projects owned by the currently logged-in user.
- GET /api/projects/:id
  - Get a single project by its ID.
- PUT /api/projects/:id
  - Update a project.
- DELETE /api/projects/:id
  - Delete a project.

Manage Tasks:

- POST /api/projects/:projectId/tasks
  - Create a new task for a specific project.
- GET /api/projects/:projectId/tasks
  - Get all tasks for a specific project.
- PUT /api/tasks/:taskId
  - Update a single task.
- DELETE /api/tasks/:taskId
  - Delete a single task.

### Links

- Live Site URL: (https://fiel.us/pro-tasker/)

## My process

### Built with

- Node.js & Express: Server setup, modular routing, middleware implementation, and RESTful API design.
- MongoDB & Mongoose: Complex schema design with relationships (ref), data validation, and advanced Mongoose queries for CRUD operations.
- Authentication & Authorization: JWT-based user authentication (registration and login), password hashing with bcrypt, and multi-layered, ownership-based authorization rules.
- TSC transpiling and bundling

### What I learned

This API required several chained Mongoose database queries in order to pull and verify ids and ownership before making changes to the data. This can be done in multiple ways, so it was good to explore these options and choose better performing queries that don't require full collection pulls to work.

## Author

David Fiel

- Website - [David Fiel](https://fiel.us)

## Acknowledgments

- Thanks to Per Scholas!
