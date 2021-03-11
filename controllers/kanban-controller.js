const { Task } = require("../models/")

class KanbanBoard {

  static getTask(req, res, next) {
    Task.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static addTask(req, res, next) {
    let body = {
      title: req.body.title,
      description: req.body.description,
      point: req.body.point,
      assign_to: req.body.assign_to,
      UserId: req.user.id
    }
    Task.create(body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        let errors = []
        if(err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "dari controller kanban addTask"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari controller kanban addTask"})
        }
      })
  }

  static moveTask(req, res, next) {
    const idTask = +req.params.id
    const body = {
      category: req.body.category
    }
    Task.update(body, {where: { id: idTask }})
      .then((data) => {
        if(data) {
          res.status(201).json({message: `success moving to ${body.category}'s Table`, data: idTask})
        }
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
      })
  }

  static deleteTask(req, res, next) {
    const idTask = +req.params.id
    Task.destroy({ where: { id: idTask }})
      .then((data) => {
        res.status(200).json({message: "Task deleted", data: idTask})
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari deleteTask controller"})
      })
  }

  static getEdit(req, res, next) {
    const idTask = +req.params.id
    Task.findOne({where: { id: idTask}})
      .then((data) => {
        if(data) {
          res.status(200).json({data})
        } else {
          next({code: 404, message: "Data Not Found", from: "dari getEdit controller"})
        }
      })
      .catch((err) => {
        console.log(err)
        next({code: 500, message: "Internal Server Error", from: "dari getEdit controller"})
      })
  }

  static editTask(req, res, next) {
    const idTask = +req.params.id
    let body = {
      title: req.body.title,
      description: req.body.description,
      point: req.body.point,
      assign_to: req.body.assign_to,
    }
    Task.update(body, {where: { id: idTask }})
      .then((data) => {
        console.log(data)
        if(data[0] == 1) {
          res.status(200).json({message: "update success"})
        } else {
          next({ code: 400, message:"Data harus diisi"})
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Internal Server Error", from: "dari editTask controller"})
      })
  }
}

module.exports = KanbanBoard