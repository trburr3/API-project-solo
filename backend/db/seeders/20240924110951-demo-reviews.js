'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    spotId: 4,
    userId: 1,
    review: "Started off great, but the host was kind of rude.",
    stars: 3
  },
  {
    spotId: 1,
    userId: 5,
    review: "Best place i've ever stayed at! Will be back soon.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 2,
    review: "Not at all like the pictures!",
    stars: 2
  },
  {
    spotId: 5,
    userId: 4,
    review: "Great stay! Totally five stars if the wifi was a bit stronger.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 3,
    review: "This place smelled so bad...",
    stars: 1
  },
  {
    spotId: 6,
    userId: 4,
    review: "Great stay! Totally five stars if the wifi was a bit stronger.",
    stars: 4
  },
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
    await Review.bulkCreate(reviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, {
      userId: reviews.map( Reviews => Reviews.userId)
    }, {});
  }
};