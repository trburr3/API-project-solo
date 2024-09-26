// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// Get all of the Current User's Bookings
router.get("/current",async (req, res) => {
    const { user } = req;
    const bookings = await Booking.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Spot,
          attributes: { exclude: ["createdAt", "updatedAt", "description"] },
          include: [
            {
              model: SpotImage,
              attributes: ["url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
      ],
    });
  
    const bookingsWithDetails = bookings.map((booking) => {
      const bookingJson = booking.toJSON();
      
      const previewImage =
        bookingJson.Spot.SpotImages.length > 0
          ? bookingJson.Spot.SpotImages[0].url
          : "No preview image yet.";
  
      return {
        ...bookingJson,
        Spot: {
          id: bookingJson.Spot.id,
          ownerId: bookingJson.Spot.ownerId,
          address: bookingJson.Spot.address,
          city: bookingJson.Spot.city,
          state: bookingJson.Spot.state,
          country: bookingJson.Spot.country,
          lat: bookingJson.Spot.lat,
          lng: bookingJson.Spot.lng,
          name: bookingJson.Spot.name,
          price: bookingJson.Spot.price,
          previewImage: previewImage,
        },
      };
    });
    return res.status(200).json({ Bookings: bookingsWithDetails });
  });





// end of this page
module.exports = router;