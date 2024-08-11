"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Road, { foreignKey: "roadId" });
    }
  }
  Comment.init(
    {
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      roadId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
