// Import required modules
const express = require('express') // Framework for creating the server
const bodyParser = require('body-parser') // Middleware for parsing form data

// Initialize the Express app
const app = express()
const PORT = 3000 // Port number where the server will run

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true })) // Parse form data
app.set('view engine', 'ejs') // Use EJS for rendering HTML

// Temporary storage for tasks (in-memory)
let tasks = []

// Routes (Endpoints)

// Home route: Display tasks
app.get('/', (req, res) => {
  res.render('index', { tasks }) // Render the "index.ejs" view
})

// Add task route
app.post('/tasks', (req, res) => {
  tasks.push(req.body.task) // Add the new task to the array
  res.redirect('/') // Redirect back to the home page
})

// Delete task route
app.post('/tasks/delete', (req, res) => {
  const index = req.body.index // Get the index of the task to delete
  tasks.splice(index, 1) // Remove the task from the array
  res.redirect('/') // Redirect back to the home page
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
