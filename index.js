const express = require('express')
const bodyParser = require('body-parser')

// Importing route files
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

const app = express()
const PORT = 3000

// Middleware for parsing JSON and form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Middleware to serve static files (e.g., CSS)
app.use(express.static('public'))

// Set EJS as the template engine
app.set('view engine', 'ejs')

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`)
  next()
})

// Route handlers
app.use('/tasks', taskRoutes) // Task routes
app.use('/users', userRoutes) // User routes
app.use('/projects', projectRoutes) // Project routes

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
