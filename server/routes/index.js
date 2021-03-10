const express = require('express')
const router = express.Router()
const userRouter = require('./user-controller')
const kanbanRouter = require('./kanban-controller')

router.get('/', (req, res, next) => {
    res.send('Hello World!')
})
router.use("/", userRouter)
router.use("/kanban", kanbanRouter)


module.exports = router
