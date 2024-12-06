const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

let tasks = []

// GET /tasks - Fetch all tasks
router.get('/', (req, res) => {
  const statusFilter = req.query.status // Bonus: Query parameter for filtering
  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks
  res.json(filteredTasks)
})

// POST /tasks - Add a new task
router.post('/', (req, res) => {
  const newTask = {
    id: uuidv4(),
    description: req.body.description,
    status: 'Pending',
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// GET /tasks/:id - Fetch a task by ID
router.get('/:id([0-9a-fA-F-]{36})', (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
})

// PATCH /tasks/:id - Update a task
router.patch('/:id([0-9a-fA-F-]{36})', (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id)
  if (!task) return res.status(404).json({ message: 'Task not found' })

  if (req.body.description) task.description = req.body.description
  if (req.body.status) task.status = req.body.status

  res.json(task)
})

// DELETE /tasks/:id - Delete a task
router.delete('/:id([0-9a-fA-F-]{36})', (req, res) => {
  const index = tasks.findIndex((task) => task.id === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Task not found' })

  const deletedTask = tasks.splice(index, 1)
  res.json(deletedTask[0])
})

module.exports = router
