const express = require('express')
const bodyParser = require('body-parser')

const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

const app = express()
const PORT = 3000

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Custom Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`)
  next()
})

// Route Handlers
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', { message: 'Something went wrong!' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
