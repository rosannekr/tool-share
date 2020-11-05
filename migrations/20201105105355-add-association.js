'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

return queryInterface.addColumn("Products","ownerId", {
  type: Sequelize.INTEGER,
  references: {
    model: "Users",
    key: "id"
  }
}) 

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Products","OwnerId");
  }
};
