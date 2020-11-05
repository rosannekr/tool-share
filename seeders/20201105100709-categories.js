"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Kitchen",
        },
        {
          name: "Garden",
        },
        {
          name: "Home",
        },
        {
          name: "Construction",
        },
        {
          name: "Leisure",
        },
        {
          name: "Other",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
