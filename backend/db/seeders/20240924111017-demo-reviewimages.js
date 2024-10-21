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
    url: "https://cdn.pixabay.com/photo/2021/09/14/01/59/cube-6622736_1280.png"
  },
  {
    reviewId: 2,
    url: "https://cdn.pixabay.com/photo/2021/09/14/02/03/video-game-6622751_1280.png"
  },
  {
    reviewId: 3,
    url: "https://cdn.pixabay.com/photo/2021/09/14/01/58/cube-6622734_1280.png"
  },
  {
    reviewId: 1,
    url: "https://cdn.pixabay.com/photo/2021/09/14/02/00/video-game-6622740_1280.png"
  },
  {
    reviewId: 5,
    url: "https://cdn.pixabay.com/photo/2021/09/14/02/02/video-game-6622749_1280.png"
  },
  {
    reviewId: 6,
    url: "https://cdn.pixabay.com/photo/2021/09/14/01/58/cube-6622735_1280.png"
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