"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Requests",
      [
        {
          userId: 1,
          productId: 2,
          startDate: "2020-11-11",
          endDate: "2020-11-12",
          confirmed: 1,
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          productId: 3,
          startDate: "2020-11-20",
          endDate: "2020-11-23",
          confirmed: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          productId: 3,
          startDate: "2020-11-5",
          endDate: "2020-11-8",
          confirmed: 1,
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          productId: 2,
          startDate: "2020-11-28",
          endDate: "2020-11-29",
          confirmed: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          productId: 5,
          startDate: "2020-11-25",
          endDate: "2020-11-27",
          confirmed: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          productId: 4,
          startDate: "2020-11-2",
          endDate: "2020-11-3",
          confirmed: 1,
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 3,
          productId: 6,
          startDate: "2020-11-10",
          endDate: "2020-11-11",
          confirmed: 1,
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 4,
          productId: 1,
          startDate: "2020-11-20",
          endDate: "2020-11-22",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          productId: 3,
          startDate: "2020-11-29",
          endDate: "2020-11-30",
          confirmed: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Requests", null, {});
  },
};
