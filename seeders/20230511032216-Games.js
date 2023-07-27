'use strict';
const fs = require('fs')
const dataGame = JSON.parse(fs.readFileSync('./data/games.json', 'utf-8')).map(el => {
  delete el.id 
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Games', dataGame, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Games', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
