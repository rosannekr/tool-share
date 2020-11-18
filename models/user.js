"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      picture: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Product, { onDelete: "cascade" });
    User.hasMany(models.Message, { foreignKey: "sender_id" });
    User.hasMany(models.Message, { foreignKey: "receiver_id" });
  };

  return User;
};
