const express = require('express')
const bodyParser = require('body-parser')

const taskRoutes = require('./routes/tasks') // Task routes
const userRoutes = require('./routes/users') // User routes
const projectRoutes = require('./routes/projects') // Project routes

const app = express()
const PORT = 3000

// Middleware for parsing JSON and form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files (CSS, images, etc.)
app.use(express.static('public'))

// Set EJS as the template engine
app.set('view engine', 'ejs')

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`)
  next()
})

// Custom middleware to validate POST requests
app.use((req, res, next) => {
  if (req.method === 'POST' && !req.body.description) {
    return res.status(400).send('Description cannot be empty')
  }
  next()
})

// Route handlers
app.use('/tasks', taskRoutes) // Tasks routes
app.use('/users', userRoutes) // Users routes
app.use('/projects', projectRoutes) // Projects routes

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', { message: 'Something went wrong!' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
