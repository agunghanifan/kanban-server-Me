'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User,{foreignKey: "UserId"})
      Task.belongsTo(models.Category,{foreignKey: "CategoryId"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title is required"
        },
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    } ,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description is required"
        },
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    } ,
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Point is required"
        },
        notEmpty: {
          args: true,
          msg: "Point is required"
        }
      }
    },
    assign_to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Assign to is needed"
        },
        notEmpty: {
          args: true,
          msg: "Assign to is needed"
        }
      }
    } ,
    UserId: {
      type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
    } ,
    CategoryId: {
      type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Categories"
          },
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
    }
  }, {
    sequelize,
    modelName: 'Task',
    // hooks: {
    //   beforeCreate: (instance) => {
    //     instance.CategoryId = 1
    //   }
    // }
  });
  return Task;
};