'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Road extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Comment, { foreignKey: "roadId" });
      
    }
  }
  Road.init({
    title: DataTypes.STRING,
    mapLink: DataTypes.TEXT,
    length: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Road',
  });
  return Road;
};