"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Product, { onDelete: "cascade" });
    User.belongsToMany(models.Product, {
      through: models.BorrowedProduct,
      as: "Borrowed",
      onDelete: "cascade",
    });
  };

  return User;
};
