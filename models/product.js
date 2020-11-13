"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      pricePerDay: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
      NumOfDaysAvailable: DataTypes.INTEGER,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      condition: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category);
    Product.belongsTo(models.User);
    Product.hasMany(models.Request, { onDelete: "cascade" });
  };
  return Product;
};
