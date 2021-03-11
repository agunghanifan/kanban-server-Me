const express = require('express')
const router = express.Router()
const KanbanBoard = require('../controllers/kanban-controller')
const { authenticate, authorization } = require("../middlewares/auth")

// authenticate before next routing
router.use(authenticate)

// get data from server to display in kanban board
router.get("/", KanbanBoard.getTask)

// add backlog data
router.post("/add", KanbanBoard.addTask)

// move task  to another table
router.patch("/task/:id", authorization, KanbanBoard.moveTask)

// get data who ready to edit to client
router.get("/task/:id", authorization, KanbanBoard.getEdit)

// edit task on specified table
router.put("/task/:id", authorization, KanbanBoard.editTask)

// delete task on specified table
router.delete("/task/:id", authorization, KanbanBoard.deleteTask)

module.exports = router