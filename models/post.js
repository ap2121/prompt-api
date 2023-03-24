'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    
    },
    capPrompt: DataTypes.STRING,
    capRes: DataTypes.STRING,
    imgPrompt: DataTypes.STRING,
    imgRes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};