"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "drill",
          description: "Powerful drill, works on batteries.",
          PointPrice: "2",
          isAvailable: true,
          ownerId: 1,
          categoryId: 4,
        },
        {
          name: "tent",
          description: "2-person tent for camping.",
          PointPrice: "10",
          isAvailable: true,
          ownerId: 2,
          categoryId: 5,
        },
        {
          name: "barbecue",
          description: "Charcoal BBQ. Cooking area: 40 cm.",
          PointPrice: "5",
          isAvailable: true,
          ownerId: 3,
          categoryId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
