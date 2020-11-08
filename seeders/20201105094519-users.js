"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          username: "john123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anne",
          username: "anne123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob",
          username: "bob123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
