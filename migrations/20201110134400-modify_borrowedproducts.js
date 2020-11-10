"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("BorrowedProducts", "startDate", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("BorrowedProducts", "endDate", {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("BorrowedProducts", "startDate"),
      queryInterface.removeColumn("BorrowedProducts", "endDate"),
    ]);
  },
};
