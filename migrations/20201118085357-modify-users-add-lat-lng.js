"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("Users", "lat", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn("Users", "lng", {
        type: Sequelize.FLOAT,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("Users", "lat"),
      queryInterface.removeColumn("Users", "lng"),
    ];
  },
};
