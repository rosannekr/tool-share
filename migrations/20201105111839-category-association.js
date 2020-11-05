'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

return queryInterface.addColumn("Products","category", {
  type: Sequelize.INTEGER,
  references: {
    model: "Categories",
    key: "id"
  }
}) 

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Categories","category");
  }
};
