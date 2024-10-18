'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImageData = [
  {
    reviewId: 4,
    url: "https://images.app.goo.gl/jYJGSQZfJMUGwsVH9"
  },
  {
    reviewId: 2,
    url: "https://images.app.goo.gl/4pMTvNj9YoVVFFbV6"
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
    await ReviewImage.bulkCreate(reviewImageData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, {
      reviewId: reviewImageData.map( ReviewImages => ReviewImages.reviewId)
    }, {});
  }
};