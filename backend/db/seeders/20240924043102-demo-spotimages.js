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
    url: "https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1729119387~exp=1729122987~hmac=4bc1f05cf40ad07092dea56a3d9b4a34cdb4ccab636588305237f3c3e4588e1c&w=2000",
    preview: true
  },
  {
    spotId: 2,
    url: "https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1729119387~exp=1729122987~hmac=4bc1f05cf40ad07092dea56a3d9b4a34cdb4ccab636588305237f3c3e4588e1c&w=2000",
    preview: false
  },
  {
    spotId: 3,
    url: "https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1729119387~exp=1729122987~hmac=4bc1f05cf40ad07092dea56a3d9b4a34cdb4ccab636588305237f3c3e4588e1c&w=2000",
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