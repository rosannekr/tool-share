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
    User.hasMany(models.Product);
    User.belongsToMany(models.Product, { through: 'BorrowedProducts', as: 'Borrowed' });
  };
  return User;
};
