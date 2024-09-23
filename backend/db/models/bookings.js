'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookings.belongsTo(models.User, {
        foreignKey: "userId"
      });

      Bookings.belongsTo(models.Spots, {
        foreignKey: "spotId"
      })
    }
  }
  Bookings.init({
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
      unique: true,
      validate: {
        isDate: true,
        isBefore,
        isAfter
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
      validate: {
        isDate: true,
        isAfter,
        isBefore
      }
    },
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};