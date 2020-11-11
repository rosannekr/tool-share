"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("BorrowedProducts", "id", {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("BorrowedProducts", "confirmed", {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("BorrowedProducts", "id"),
      queryInterface.removeColumn("BorrowedProducts", "confirmed"),
    ]);
  },
};
