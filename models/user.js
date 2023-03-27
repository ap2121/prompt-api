'use strict';
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
      User.hasMany(models.Post, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      User.hasMany(models.Comment, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      User.belongsToMany(models.User, { as: 'Followers', through: models.UserFollowers, foreignKey: 'userId'})
      User.belongsToMany(models.User, {as: 'Following', through: models.UserFollowers, foreignKey: 'followedId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proPic: {
      type: DataTypes.STRING(1000)
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};