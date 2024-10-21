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
    url: "https://cdn.pixabay.com/photo/2015/03/04/05/55/minecraft-658332_1280.png",
    preview: true
  },
  {
    spotId: 1,
    url: "https://cdn.pixabay.com/photo/2015/03/01/19/32/minecraft-655158_1280.jpg",
    preview: false
  },
  {
    spotId: 1,
    url: "https://cdn.pixabay.com/photo/2015/03/04/05/56/minecraft-658333_1280.jpg",
    preview: false
  },
  {
    spotId: 1,
    url: "https://cdn.pixabay.com/photo/2015/03/02/12/07/minecraft-655903_1280.png",
    preview: false
  },
  {
    spotId: 1,
    url: "https://cdn.pixabay.com/photo/2014/11/13/15/24/minecraft-529464_1280.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://cdn.pixabay.com/photo/2014/11/13/15/23/minecraft-529459_1280.jpg",
    preview: true
  },
  {
    spotId: 2,
    url: "https://cdn.pixabay.com/photo/2014/11/13/15/24/minecraft-529461_1280.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://cdn.pixabay.com/photo/2015/03/11/21/53/minecraft-669307_1280.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://cdn.pixabay.com/photo/2015/03/11/21/52/minecraft-669303_1280.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://cdn.pixabay.com/photo/2014/11/13/15/24/minecraft-529460_1280.jpg",
    preview: false
  },
  {
    spotId: 3,
    url: "https://cdn.pixabay.com/photo/2015/02/14/22/39/minecraft-636747_1280.jpg",
    preview: true
  },
  {
    spotId: 4,
    url: "https://cdn.pixabay.com/photo/2017/11/07/18/26/minecraft-2927742_1280.jpg",
    preview: true
  },
  {
    spotId: 5,
    url: "https://cdn.pixabay.com/photo/2017/01/18/00/17/minecraft-1988580_1280.jpg",
    preview: true
  },
  {
    spotId: 5,
    url: "https://cdn.pixabay.com/photo/2017/01/11/04/57/minecraft-1970876_1280.jpg",
    preview: false
  },
  {
    spotId: 5,
    url: "https://cdn.pixabay.com/photo/2015/03/01/19/32/minecraft-655163_1280.jpg",
    preview: false
  },
  {
    spotId: 6,
    url: "https://cdn.pixabay.com/photo/2016/08/03/16/28/minecraft-1567133_1280.jpg",
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