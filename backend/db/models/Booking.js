'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userId"
      });

      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId"
      })
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
      validate: {
        isDate: true,
        // isBefore: this.endDate,
        // we can't use "this" in sequelize ****

        // isAfter: Sequelize.literal('CURRENT_TIMESTAMP'),
        // *****
        isAfterToday(value) {
          if (new Date(value) <= new Date()) {
            throw new Error("Start date must be later than today.");
          }
        },

      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // unique: true,
      validate: {
        isDate: true,
        // isAfter: this.startDate,
        // *****
        // isBefore
        isAfterStartDate(value) {
          if (new Date(value) <= new Date(this.startDate)) {
            throw new Error("End date must be after start date.");
          }
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};