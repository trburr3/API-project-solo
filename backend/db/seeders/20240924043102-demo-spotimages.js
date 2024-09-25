'use strict';

const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const SpotImages = [
  {
    spotId: 1,
    url: "https://pixabay.com/zh/photos/mountain-volcano-peak-summit-477832/",
    preview: true
  },
  {
    spotId: 2,
    url: "https://pixabay.com/zh/photos/mountains-sunlight-alps-nature-6753786/",
    preview: false
  },
  {
    spotId: 3,
    url: "https://pixabay.com/zh/photos/lake-forest-trees-woods-water-4591082/",
    preview: true
  }
];


/** @type {import('sequelize-cli').Migration} */
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
   await SpotImage.bulkCreate(SpotImages,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, SpotImages, {});
  }
};
