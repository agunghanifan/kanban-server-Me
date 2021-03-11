const { decodedToken } = require("../helpers/jwt")
const { User, Task } = require("../models/")

const authenticate = (req, res, next) => {
  try {
    const result = decodedToken(req.headers.access_token)
    if (result) {
      User.findOne({ where: { email: result.email, id: result.id, name: result.name } })
        .then((data) => {
          if (data) {
            console.log("Pass authenticate")
            req.user = { id: data.id, name: data.name, email: data.email }
            next()
          } else {
            console.log("authenticate Fail")
            next({ code: 404, message: "Unauthorized User (not found)", from: "dari authenticate auth.js" })
          }
        })
        .catch((err) => {
          console.log("authenticate Fail")
          next({ code: 401, message: "Unauthorized User", from: "dari authenticate auth.js" })
        })
    }
  } catch (error) {
    if (error) {
      console.log("authenticate Fail")
      next({ code: 401, message: "Unauthorized User", from: "dari authenticate auth.js" })
    } else {
      next({ code: 500, message: "Internal Server Error", from: "dari authenticate auth.js" })
    }
  }
}


const authorization = (req, res, next) => {
  const idTask = +req.params.id
  const idUser = +req.user.id

  Task.findOne({ where: { id: idTask } })
    .then((data) => {
      if (data) {
        if (data.UserId === idUser) {
          console.log("pass authorization")
          next()
        } else {
          next({ code: 401, message: "Unauthorized User", from: "dari authorization auth.js" })
        }
      } else {
        next({ code: 404, message: "Data not Found", from: "dari authorization auth.js" })
      }
    })
    .catch((error) => {
      next({ code: 500, message: "Internal Server Error", from: "dari authorization auth.js" })
    })
}

module.exports = {
  authenticate,
  authorization
}