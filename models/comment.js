'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Comment.belongsTo(models.Post, {foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    comPrompt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comRes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
};