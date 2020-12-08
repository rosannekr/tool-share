"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          name: "John",
          username: "john123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 20,
          picture: "public/pictures/leilani-angel-K84vnnzxmTQ-unsplash.jpg",
          address: "Travessera de Gracia, 159, Barcelona",
          lat: 41.4011,
          lng: 2.15741,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Anne",
          username: "anne123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          points: 10,
          picture: "public/pictures/edward-cisneros-_H6wpor9mjs-unsplash.jpg",
          address: "Carrer d'Entença, 297, Barcelona",
          lat: 41.3887,
          lng: 2.1389,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Bob",
          username: "bob123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/christian-buehner-DItYlc26zVI-unsplash.jpg",
          points: 30,
          address: "Passeig Sant Joan, 50, Barcelona",
          lat: 41.394,
          lng: 2.17731,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Sara",
          username: "sara123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/mathias-huysmans-U4JDjYmjn1g-unsplash.jpg",
          address: "Plaza de la Constitución, 4, Málaga",
          lat: 36.7208,
          lng: -4.4223,
          points: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Emily",
          username: "emily123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/photo-1488426862026-3ee34a7d66df.jpeg",
          address: "Av. de la Aurora, 61, Málaga",
          lat: 36.7152,
          lng: -4.439,
          points: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: "Tom",
          username: "tom123",
          password:
            "$2b$10$zA3U2TyT9WA3mKuxlOHlo.em0h6vb5wvp12DG.iwC0hPshmgOXRLm",
          picture: "public/pictures/irene-strong-v2aKnjMbP_k-unsplash.jpg",
          address: "Av. del Higuerón, 54, Benalmádena, Málaga",
          lat: 36.5785,
          lng: -4.5967,
          points: 25,
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
