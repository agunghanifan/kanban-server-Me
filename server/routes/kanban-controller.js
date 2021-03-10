const express = require('express')
const router = express.Router()
const KanbanBoard = require('../controllers/kanban-controller')
const { authenticate, authorization } = require("../middlewares/auth")

// authenticate before next routing
router.use(authenticate)

// get data from server to display in kanban board
router.get("/", KanbanBoard.getBacklog)
router.get("/", KanbanBoard.getDoing)
router.get("/", KanbanBoard.getDone)
router.get("/", KanbanBoard.getTodo)

// add backlog data
router.post("/add", KanbanBoard.addBacklog)

// move task  to another table
router.post("/move-forward/:tableFrom/:id", authorization, KanbanBoard.moveForwardTable)
router.post("/move-backward/:tableFrom/:id", authorization, KanbanBoard.moveBackTable)

// delete task on specified table
router.get("/delete/:tableFrom/:id", authorization, KanbanBoard.deleteTask)

module.exports = router