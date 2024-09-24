'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookings = [
  {
    spotId: 2,
    userId: 3,
    startDate: newDate(Date.UTC(125, 6, 30)),
    endDate: newDate(Date.UTC(125, 7, 4))
  },
  {
    spotId: 1,
    userId: 4,
    startDate: newDate(Date.UTC(125, 2, 1)).toUTCString(),
    endDate: newDate(Date.UTC(125, 2, 5)).toUTCString()
  },
  {
    spotId: 5,
    userId: 5,
    startDate: newDate(Date.UTC(124, 11, 15)).toUTCString(),
    endDate: newDate(Date.UTC(124, 11, 25)).toUTCString()
  },
  {
    spotId: 3,
    userId: 1,
    startDate: newDate(Date.UTC(125, 0, 3)).toUTCString(),
    endDate: newDate(Date.UTC(125, 0, 10)).toUTCString()
  },
  {
    spotId: 4,
    userId: 2,
    startDate: newDate(Date.UTC(124, 9, 30)).toUTCString(),
    endDate: newDate(Date.UTC(124, 10, 2)).toUTCString()
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate(bookings, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, {
      userId: bookings.map( Bookings => Bookings.userId)
    }, {});
  }
};
