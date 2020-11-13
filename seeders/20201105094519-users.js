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
          picture: "public/pictures/leilani-angel-K84vnnzxmTQ-unsplash.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anne",
          username: "anne123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 10,
          picture: "public/pictures/edward-cisneros-_H6wpor9mjs-unsplash.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob",
          username: "bob123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/christian-buehner-DItYlc26zVI-unsplash.jpg",
          points: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sara",
          username: "sara123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/mathias-huysmans-U4JDjYmjn1g-unsplash.jpg",
          points: 50,
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
