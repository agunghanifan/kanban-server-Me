'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Categories", [{
      nameCategory : "Backlog",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nameCategory : "To-Do",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nameCategory : "Doing",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nameCategory : "Done",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
