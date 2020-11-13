"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      pricePerDay: DataTypes.INTEGER,
      numOfDaysAvailable: DataTypes.INTEGER,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      condition: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category);
    Product.belongsTo(models.User, { onDelete: "cascade" });
    Product.hasMany(models.Request, {
      onDelete: "cascade",
    });
  };
  return Product;
};
