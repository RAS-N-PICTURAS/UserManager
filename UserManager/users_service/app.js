const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/index');


const app = express();

// Middleware
//app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// API Routes
app.use('/api/users', userRoutes); // Routes for managing projects

// Default route for testing the server
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Users Microservice is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;