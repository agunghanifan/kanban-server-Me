'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/hash-password")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Backlog,{foreignKey: "UserId"})
      User.hasMany(models.Doing,{foreignKey: "UserId"})
      User.hasMany(models.Done,{foreignKey: "UserId"})
      User.hasMany(models.Todo,{foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Real Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required"
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
      }
    } ,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        },
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterValidate: (instance) => {
        if(instance.password.length < 6) {
          throw new Error("Password must be at least 6 characters")
        }
      },
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      } 
    }
  });
  return User;
};