require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require("./routes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(router)


  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })