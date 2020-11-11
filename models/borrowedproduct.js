"use strict";
module.exports = (sequelize, DataTypes) => {
  const BorrowedProduct = sequelize.define(
    "BorrowedProduct",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      confirmed: DataTypes.BOOLEAN,
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {}
  );

  return BorrowedProduct;
};
