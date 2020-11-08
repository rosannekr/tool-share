"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "drill",
          description: "Powerful drill, works on batteries.",
          pricePerDay: "2",
          isAvailable: true,
          userId: 1,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tent",
          description: "2-person tent for camping.",
          pricePerDay: "10",
          isAvailable: true,
          userId: 2,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "barbecue",
          description: "Charcoal BBQ. Cooking area: 40 cm.",
          pricePerDay: "5",
          isAvailable: true,
          userId: 3,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "raclette",
          description: "For a delicious meal at home.",
          pricePerDay: "5",
          isAvailable: true,
          userId: 3,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
