const express = require('express')
const router = express.Router()
const ControllerUser = require("../controllers/controller-user")

router.post("/register", ControllerUser.registerUser)
router.post("/login", ControllerUser.loginUser)
router.post("/loginGoogle", ControllerUser.googleLogin)

module.exports = router