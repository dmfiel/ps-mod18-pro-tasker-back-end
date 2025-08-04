# Pro Tasker - Project Management

This project provides a full-stack application for project and task management, Pro Tasker. This API is the engine that powers the entire application, handling user accounts, project management, and individual tasks. It provides a real-world, secure, and functional RESTful API with user-level authentication and authorization to keep information private.

## Table of contents

- [🛠️ Tech Stack](#tech-stack)
  - [🚀 Core Stack](#core-stack)
  - [🎨 UI & Stylin](#ui-&-styling)
  - [🔐 Authentication & Security](#authentication-&-security)
  - [🧰 Dev Tools & Utilities](#dev-tools-&-utilities)
  - [🧪 Testing & Debugging](#testing-&-debugging)
  - [📦 Deployment](#deployment)
  - [⏱️ Scheduling / Automation](#scheduling-/-automation)
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## 🛠️ Tech Stack

### 🚀 Core Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-3e863d?style=flat-square&logo=mongodb&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-880000?style=flat-square)
![Express](https://img.shields.io/badge/Backend-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

### 🎨 UI & Styling

![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

### 🔐 Authentication & Security

![JWT](https://img.shields.io/badge/Auth-JWT-FFB400?style=flat-square&logo=jsonwebtokens&logoColor=black)
![bcrypt](https://img.shields.io/badge/Security-bcrypt-ef5c00?style=flat-square)
![CORS](https://img.shields.io/badge/Middleware-CORS-blue?style=flat-square)
![dotenv](https://img.shields.io/badge/Env-dotenv-green?style=flat-square)

### 🧰 Dev Tools & Utilities

![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Nodemon](https://img.shields.io/badge/Dev-Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=black)
![ESLint](https://img.shields.io/badge/Linter-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Formatter-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

### 🧪 Testing & Debugging

![Postman](https://img.shields.io/badge/API_Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)

### 📦 Deployment

![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![MongoDB Atlas](https://img.shields.io/badge/DB_Host-MongoDB_Atlas-11B048?style=flat-square&logo=mongodb&logoColor=white)

### ⏱️ Scheduling / Automation

![Cron Job](https://img.shields.io/badge/Cron%20Job-4285F4?style=for-the-badge&logo=cronjob&logoColor=white)

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
- POST /api/projects/:id/tasks
  - Create a new task for a project.
- GET /api/projects
  - Get all projects owned by the currently logged-in user.
- GET /api/projects/:id
  - Get a single project by its ID.
- GET /api/projects/:id/tasks
  - Get all tasks for a project.
- PUT /api/projects/:id
  - Update a project.
- DELETE /api/projects/:id
  - Delete a project.

Manage Tasks:

- POST /api/tasks
  - Create a new task for a specific project.
- GET /api/tasks
  - Get all tasks for the user.
- GET /api/tasks/:id
  - Get a single task.
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
