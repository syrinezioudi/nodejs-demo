const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/tasks.json');

// Get all tasks
router.get('/', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
  res.json(tasks[taskIndex]);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const taskId = parseInt(req.params.id, 10);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);

  if (updatedTasks.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedTasks, null, 2));
  res.status(204).send();
});

// Search tasks by title keyword
router.get('/search/:keyword', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const keyword = req.params.keyword.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(keyword)
  );

  if (filteredTasks.length === 0) {
    return res.status(404).json({ error: 'No tasks found matching the keyword' });
  }

  res.json(filteredTasks);
});



module.exports = router;
