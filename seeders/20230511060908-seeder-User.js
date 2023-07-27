'use strict';
const fs = require('fs')
const bcryptjs = require('bcryptjs')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).map(
      (el) => {

        let passwordUser = el.password
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(passwordUser,salt)

        el.password = hash
        el.createdAt = new Date()
        el.updatedAt = new Date();
        return el;
      }
    );
    return queryInterface.bulkInsert("Users", data, {});
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
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
