const { Backlog, Todo, Doing, Done } = require("../models/")

class KanbanBoard {

  static getBacklog(req, res, next) {
    Backlog.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getTodo(req, res, next) {
    Todo.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getDoing(req, res, next) {
    Doing.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getDone(req, res, next) {
    Done.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static addBacklog(req, res, next) {
    let body = {
      title: req.body.title,
      description: req.body.description,
      point: req.body.point,
      assign_to: req.body.assign_to,
      UserId: req.user.id
    }
    Backlog.create(body)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        let errors = []
        if(err.errors.length) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({code: 400, message: errors, from: "dari controller kanban addBacklog"})
        } else {
          next({code: 500, message: "Internal Server Error", from: "dari controller kanban addBacklog"})
        }
      })
  }

  static moveForwardTable(req, res, next) {
    const idTask = +req.params.id
    const tableFrom = req.params.tableFrom
    let dataNew

    if(tableFrom == Backlog.name) {
      Backlog.findOne({where: { id: idTask }})
        .then((dataBefore) => {
          // console.log(dataBefore.data)
          const { title, description, point, assign_to, UserId } = dataBefore
          const body = {title, description, point, assign_to, UserId}
          return Todo.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          return Backlog.destroy({where: {id: idTask}})
        })
        .then(() => {
          res.status(201).json({message: `success delete from Backlog Table and success moving to Todos Table` , data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })
    } else if (tableFrom == Todo.name) {
      Todo.findOne({where: { id: idTask }})
        .then((dataBefore) => {
          const { title, description, point, assign_to, UserId } = dataBefore
          const body = {title, description, point, assign_to, UserId }
          return Doing.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          return Todo.destroy({where: {id: idTask}})
        })
        .then(() => {
          res.status(201).json({message: `success delete from Todo Table and success moving to Doing Table`, data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })

    } else if (tableFrom == Doing.name) {
      Doing.findOne({ where: { id: idTask } })
        .then((dataBefore) => {
          const { title, description, point, assign_to, UserId} = dataBefore
          const body = {title, description, point, assign_to, UserId}
          return Done.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          return Doing.destroy({where: {id: idTask}})
        })
        .then(() => {
          res.status(201).json({message: `success delete from Doing Table and success moving to Done Table`, data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })
    } else {
      next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
    }
  }

  static moveBackTable(req, res, next) {
    const idTask = +req.params.id
    const tableFrom = req.params.tableFrom
    let dataNew

    if(tableFrom == Todo.name) {
      Todo.findOne({where: { id: idTask }})
        .then((dataBefore) => {
          const { title, description, point, assign_to, UserId } = dataBefore
          const body = {title, description, point, assign_to, UserId }
          return Backlog.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          console.log(dataNew)
          return Todo.destroy({where: {id: idTask}})
        })
        .then(() => {
          console.log("masuk sini")
          res.status(201).json({message: `success delete from Todo Table and success moving to Backlog Table`, data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })

    } else if(tableFrom == Doing.name) {
      Doing.findOne({where: {id: idTask}})
        .then((dataBefore) => {
          const { title, description, point, assign_to, UserId } = dataBefore
          const body = {title, description, point, assign_to, UserId }
          return Todo.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          return Doing.destroy({where: {id: idTask}})
        })
        .then(() => {
          res.status(201).json({message: `success delete from Doing Table and success moving to Todo Table`, data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })

    } else if(tableFrom == Done.name) {
      Done.findOne({where: {id: idTask}})
        .then((dataBefore) => {
          const { title, description, point, assign_to, UserId } = dataBefore
          const body = {title, description, point, assign_to, UserId }
          return Doing.create(body)
        })
        .then((dataAfter) => {
          dataNew = dataAfter
          return Done.destroy({where: {id: idTask }})
        })
        .then(() => {
          res.status(201).json({message: `success delete from Done Table and success moving to Doing Table`, data: dataNew})
        })
        .catch((err) => {
          console.log(err)
          next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
        })
    } else {
      next({code: 500, message: "Internal Server Error", from: "dari moveForwardTable controller"})
    }
  }

  static deleteTask(req, res, next) {
    const idTask = +req.params.id
    const tableFrom = req.params.tableFrom
    
    if(tableFrom == Backlog.name) {
      Backlog.destroy({where: {id: idTask}}).then(result).catch(resultError)
    } else if(tableFrom == Todo.name) {
      Todo.destroy({where: {id: idTask}}).then(result).catch(resultError)
    } else if(tableFrom == Doing.name) {
      Doing.destroy({where: {id: idTask}}).then(result).catch(resultError)
    } else if(tableFrom == Done.name) {
      Done.destroy({where: {id: idTask}}).then(result).catch(resultError)
    }

    function result() {
      res.status(200).json({message: `success delete from ${tableFrom}` })
    }
    function resultError() {
      res.status(500).json({message: "Internal Server Error"})
    }
  }
}

module.exports = KanbanBoard