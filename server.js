const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks'); // Importing task routes

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
