"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Kitchen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Construction",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leisure",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Other",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
