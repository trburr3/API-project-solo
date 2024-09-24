'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImages } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImage = [
  {
    reviewId: 4,
    url: "image one url"
  },
  {
    reviewId: 2,
    url: "image two url"
  },
  {
    reviewId: 5,
    url: "image three url"
  },
  {
    reviewId: 1,
    url: "image four url"
  },
  {
    reviewId: 3,
    url: "image five url"
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
    await ReviewImages.bulkCreate(reviewImage, { validate: true });
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
      reviewId: reviewImage.map( ReviewImages => ReviewImages.reviewId)
    }, {});
  }
};
