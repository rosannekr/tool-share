"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          username: "john123",
          password: "test",
          points: 20,
        },
        {
          name: "Anne",
          username: "anne123",
          password: "test",
          points: 10,
        },
        {
          name: "Bob",
          username: "bob123",
          password: "test",
          points: 30,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
