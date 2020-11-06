"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      pricePerDay: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Category);
    Product.belongsTo(models.User);
    Product.belongsToMany(models.User, {
      through: "BorrowedProducts",
      as: "Borrowers",
    });
  };
  return Product;
};
