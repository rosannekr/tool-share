"use strict";
module.exports = (sequelize, DataTypes) => {
  const BorrowedProduct = sequelize.define(
    "BorrowedProduct",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {}
  );

  return BorrowedProduct;
};
