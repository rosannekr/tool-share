"use strict";
module.exports = (sequelize, DataTypes) => {
  const BorrowedProduct = sequelize.define(
    "BorrowedProduct",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      confirmed: DataTypes.BOOLEAN,
    },
    {}
  );

  return BorrowedProduct;
};
