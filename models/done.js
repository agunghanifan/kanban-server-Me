'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Done extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Done.belongsTo(models.User,{foreignKey: "UserId"})
    }
  };
  Done.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "title is required"
        },
        notEmpty: {
          args: true,
          msg: "title is required"
        }
      }
    } ,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "description is required"
        },
        notEmpty: {
          args: true,
          msg: "description is required"
        }
      }
    } ,
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "point is required"
        },
        notEmpty: {
          args: true,
          msg: "point is required"
        }
      }
    } ,
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
          tableName: 'Users'
        },
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Done',
  });
  return Done;
};