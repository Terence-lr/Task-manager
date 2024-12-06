const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 3000

// Middleware
app.use(bodyParser.json()) // For JSON requests
app.use(bodyParser.urlencoded({ extended: true })) // For form submissions
app.use(express.static('public')) // For serving static files
app.set('view engine', 'ejs') // Template engine

// Custom Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`)
  next()
})

app.use((req, res, next) => {
  if (req.method === 'POST' && !req.body.description) {
    return res.status(400).send('Description cannot be empty')
  }
  next()
})

// Routes
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', { message: 'Something went wrong!' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
