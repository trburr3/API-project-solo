'use strict';

const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotData = [
  {
    ownerId: 1,
    address: "789 Sunset Boulevard",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 34.0522,
    lng: -118.2437,
    name: "Hollywood Hills Villa",
    description:
      "A luxurious villa located in the heart of Hollywood Hills. This modern home features sleek, minimalist architecture with floor-to-ceiling glass walls that provide panoramic views of the city and the ocean. The villa includes a private infinity pool and multiple outdoor lounge areas.",
    price: 800,
  },
  {
    ownerId: 2,
    address: "123 Lakefront Drive",
    city: "Lake Tahoe",
    state: "California",
    country: "United States of America",
    lat: 39.0968,
    lng: -120.0324,
    name: "Lakeside Cabin",
    description:
      "A rustic log cabin situated right on the shores of Lake Tahoe. This cabin boasts a private dock, cozy stone fireplace, and a spacious deck with stunning views of the crystal-clear lake. Perfect for a peaceful retreat or outdoor activities like boating and fishing.",
    price: 300,
  },
  {
    ownerId: 3,
    address: "55 Beachfront Way",
    city: "Miami",
    state: "Florida",
    country: "United States of America",
    lat: 25.7617,
    lng: -80.1918,
    name: "Oceanview Penthouse",
    description:
      "A sleek and modern penthouse offering uninterrupted ocean views in the heart of Miami Beach. The interior features open-plan living spaces, a gourmet kitchen, and a rooftop terrace complete with a hot tub. Ideal for those looking to enjoy Miami's vibrant nightlife and beaches.",
    price: 1200,
  },
  {
    ownerId: 4,
    address: "678 Alpine Trail",
    city: "Aspen",
    state: "Colorado",
    country: "United States of America",
    lat: 39.1911,
    lng: -106.8175,
    name: "Mountain Ski Lodge",
    description:
      "An upscale ski lodge nestled in the mountains of Aspen, this lodge is perfect for winter sports enthusiasts. Featuring traditional alpine decor, the lodge includes a large stone fireplace, outdoor hot tub, and private access to ski slopes. The views of snow-capped peaks are truly breathtaking.",
    price: 1000,
  },
  {
    ownerId: 5,
    address: "345 Desert Oasis Road",
    city: "Sedona",
    state: "Arizona",
    country: "United States of America",
    lat: 34.8697,
    lng: -111.7608,
    name: "Red Rock Haven",
    description:
      "A serene retreat located in the desert landscape of Sedona, surrounded by the iconic red rock formations. The house features large, open spaces with a blend of natural stone and wooden finishes, providing a tranquil atmosphere. The private outdoor patio is perfect for stargazing.",
    price: 400,
  }
]

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
    await Spot.bulkCreate(spotData,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, spotData, {});
  }
};
