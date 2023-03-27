'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFollowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFollowers.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }

    },
    followedId:{ 
      type: DataTypes.INTEGER,
      
      references: {
        model: 'users',
        key: 'id'
      }

    },
  }, {
    sequelize,
    modelName: 'UserFollowers',
    tableName: 'userFollowers'
  });
  return UserFollowers;
};