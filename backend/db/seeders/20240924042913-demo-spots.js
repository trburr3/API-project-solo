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
    address: "789X 295Y",
    city: "Snow Village",
    state: "Biome",
    country: "Chunk 59",
    lat: 34.0522,
    lng: -118.2437,
    name: "Leeward Lighthouse",
    description:
      "Nestled on a rugged cliff, this charming lighthouse getaway offers breathtaking views of crashing waves and icy seas.",
      // "Inside, the cozy warmth of a crackling fireplace contrasts beautifully with the chilly winds outside, creating the perfect retreat for relaxation and reflection. As snowflakes drift down, enjoy hot cocoa on the porch while watching the distant light beam guide ships through the frosty night.",
    price: 800,
  },
  {
    ownerId: 2,
    address: "123X 29Y",
    city: "Plains",
    state: "Biome",
    country: "Chunk 65",
    lat: 39.0968,
    lng: -120.0324,
    name: "Elegant Escape",
    description:
      "This unique bed and breakfast, housed in a charming Victorian mansion, offers a cozy retreat with a thrilling twist—at night, the occasional thump of zombies banging on the doors adds a spine-chilling element to your stay.",
      // Guests can enjoy the inviting rooms adorned with vintage decor and a hearty breakfast each morning, all while being reminded to keep their wits about them after dark. Embrace the excitement of the unknown as you gather around the fireplace to swap ghost stories and prepare for a night of unexpected encounters.",
    price: 300,
  },
  {
    ownerId: 3,
    address: "45X 367Y",
    city: "Great Oak Forest",
    state: "Biome",
    country: "Chunk 40",
    lat: 25.7617,
    lng: -80.1918,
    name: "Cliffside Cabin",
    description:
      "Deep in the heart of the forest, this rugged cabin invites adventurous souls to embrace the wild, complete with the thrill of uncovering real skeletons hidden among the trees.",
      // Surrounded by lush greenery and winding trails, the cabin serves as the perfect base for hiking, fishing, and exploring the mysteries of nature. After a day of exhilarating discovery, retreat to the cabin's warm, inviting interior, where tales of your eerie finds can be shared around the crackling fire. ",
    price: 1200,
  },
  {
    ownerId: 4,
    address: "678X 64Y",
    city: "Plains",
    state: "Biome",
    country: "Chunk 2",
    lat: 39.1911,
    lng: -106.8175,
    name: "Calm Sancturary",
    description:
      "This beautifully converted church bed and breakfast retains its historic charm, featuring stunning stained glass windows and original wood beams that create an inviting atmosphere.",
      // Each guest room is uniquely decorated, blending rustic elegance with modern comforts, while the grand common area invites relaxation with its cozy seating and fireplace. Enjoy a delightful breakfast in the former sanctuary, where the light streaming through the colorful glass fills the space with a warm, serene glow.",
    price: 1000,
  },
  {
    ownerId: 5,
    address: "345X 543Y",
    city: "Ocean",
    state: "Biome",
    country: "Chunk 50",
    lat: 34.8697,
    lng: -111.7608,
    name: "Red Rock Haven",
    description:
      "Step into a whimsical pirate ship-themed getaway, where rustic wooden beams and nautical decor set the scene for an adventurous escape.",
      // The bed, designed to resemble a captain’s quarters, is surrounded by treasure chest nightstands and maps of uncharted waters. Complete with a vintage ship wheel and lanterns, this immersive space invites you to unleash your inner buccaneer and sail away into a world of imagination.",
    price: 400,
  },
  {
    ownerId: 5,
    address: "435X 234Y",
    city: "Forest",
    state: "Biome",
    country: "Chunk 35",
    lat: 34.8697,
    lng: -111.7608,
    name: "Golden Alcove",
    description:
      "This enchanting bed and breakfast features a stunning façade reminiscent of a tiered temple, adorned with intricate carvings and vibrant colors that come alive at sunset.",
      //  Guests are treated to breathtaking views as the golden light casts a warm glow over the lush gardens and tranquil waters surrounding the property. Inside, the inviting atmosphere combines comfort and elegance, making it the perfect retreat to unwind and soak in the beauty of the evening.",
    price: 700,
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