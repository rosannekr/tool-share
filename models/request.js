"use strict";
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      confirmed: DataTypes.BOOLEAN,
      rating: DataTypes.INTEGER,
    },
    {}
  );
  Request.associate = function (models) {
    Request.belongsTo(models.User);
    Request.belongsTo(models.Product);
  };
  return Request;
};
