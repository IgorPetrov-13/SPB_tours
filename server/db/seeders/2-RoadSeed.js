"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roads",
      [
        {
          title: "один",
          mapLink:
            "https://yandex.ru/map-widget/v1/?um=constructor%3Af9955f13709f81924320a42fc1abaf906d90c585e14767b5e305252eebbd265f&amp;source=constructor",
          length: 15,
          description: "description",
          userId: 1,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roads", null, {});
  },
};
