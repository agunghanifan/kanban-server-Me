const { User } = require("../models/")
const { decodePassword } = require("../helpers/hash-password")
const { getToken } = require("../helpers/jwt")

class ControllerUser {

  static registerUser(req, res, next) {
    let body = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }
    User.create(body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        let errors = []
        if(err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "dari controller register"})
        } else if(err) {
          next({code: 400, message: err, from: "dari controller register"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari controller register"})
        }
      })
  }

  static loginUser(req, res, next) {
    let body = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({where: {email: body.email}})
      .then((data) => {
        console.log(data)
        const decoded = decodePassword(body.password, data.password)
        if(decoded) {
          const access_token = getToken(data.id, data.email, data.name)
          res.status(200).json({status: "success", id: data.id, name: data.name, email: data.email, access_token})
        } else {
          next({code: 401, message: "Email / Password is wrong, try again.", from: "dari controller login"})
        }
      })
      .catch(() => {
        next({code: 400, message: "Email / Password wajib diisi", from: "dari controller login catch"})
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email
    let userName

    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        // console.log(payload, "ini payload<<<<<<<<<<<<")
        email = payload.email
        userName = `${payload.given_name} ${payload.family_name}`

        return Account.findOne({
          where: {
            email,
            name : userName
          }
        })
      })
      .then(data => {
        // console.log(data)
        if (!data) {
          return Account.create({
            email,
            name : userName,
            password: `${String(new Date())}/*&@${email}`
          })
        } else {
          return data
        }

      })
      .then(data => {
        let access_token = getToken(data.id, data.email, data.name)
        console.log(access_token)
        res.status(200).json({
          id: data.id,
          name: data.name,
          access_token
        })
      })
      .catch(err => {
        // console.log(err);
        next({ code: 500, message: "Internal Server Error" })
      })
  }


}

module.exports = ControllerUser
