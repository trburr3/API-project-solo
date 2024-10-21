'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        // hashedPassword: bcrypt.hashSync('password')
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User'
      },
      {
        email: 'steve@block.io',
        username: 'FakeUser1',
        // hashedPassword: bcrypt.hashSync('password2')
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Steve',
        lastName: 'Minecraft'
      },
      {
        email: 'porkchop@block.io',
        username: 'porkchop',
        // hashedPassword: bcrypt.hashSync('password3')
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Pig',
        lastName: 'Mob'
      },
      {
        email: 'ender@block.io',
        username: 'finalBoss',
        // hashedPassword: bcrypt.hashSync('password3')
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Ender',
        lastName: 'Dragon'
      },
      {
        email: 'zombie@block.io',
        username: 'rotten2core',
        // hashedPassword: bcrypt.hashSync('password3')
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Rotten',
        lastName: 'Flesh'
      },
      {
        email: 'baa@block.io',
        username: 'baadguy',
        // hashedPassword: bcrypt.hashSync('password3')
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Sheep',
        lastName: 'Mob'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};