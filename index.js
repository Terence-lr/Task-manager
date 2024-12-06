const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }))

// ADD THIS LINE HERE:
app.use(express.static('public')) // This serves static files from the "public" folder

// Set EJS as the template engine
app.set('view engine', 'ejs')

// In-memory storage for tasks
let tasks = []

// Routes

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
