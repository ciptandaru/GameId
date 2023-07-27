'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      // define association here
    }
  }
  User.init({
    username: {      
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required!'
        },
        notEmpty: {
          msg: 'Username is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required!'
        },
        notEmpty: {
          msg: 'Username is required!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeValidate((instance)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password , salt);
    instance.password = hash;
  })
  return User;
};