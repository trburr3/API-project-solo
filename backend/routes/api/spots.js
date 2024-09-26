// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// maybe we need validate

// Get all Spots
// need three model:user;review(avgRating);spotimage(previewImage)

router.get("/", async (req, res) => {

    const { page = 1, size = 100 } = req.query; 
    const limit = parseInt(size);
    const offset = limit * (page - 1);
  
    try {
      const spots = await Spot.findAll({
        limit,
        offset,
        attributes: {
          include: [
            [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
          ],
        },
        include: [
          {
            model: Review,
            attributes: [],
          },
          {
            model: SpotImage,
            attributes: ["url"],
            where: { preview: true },
            required: false,
          },
        ],
        group: ["Spot.id", "SpotImage.id"],
      });
  
      const spotDetails = spots.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
        previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : "No preview image yet."
      }));
  
      return res.status(200).json({ Spots: spotDetails, page: parseInt(page), size: parseInt(size) });
    } catch (error) {
      return res.status(500).json({ message: "err" });
    }
  });




// Get all Spots owned by the Current User 
router.get("/current", async (req, res) => {
    const { user } = req;
  
    try {
      const spots = await Spot.findAll({
        where: { ownerId: user.id },
        attributes: {
          include: [
            [Sequelize.fn("AVG", Sequelize.col("Review.stars")), "avgRating"],
          ],
        },
        include: [
          {
            model: Review,
            attributes: [],
          },
          {
            model: SpotImage,
            attributes: ["url"],
            where: { preview: true },
            required: false,
          },
        ],
        group: ["Spot.id", "SpotImage.id"],
      });
  
      const spotDetails = spots.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
        previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : "No preview image yet."
      }));
  
      return res.status(200).json({ Spots: spotDetails });
    } catch (error) {
      return res.status(500).json({ message: "error" });
    }
  });
  


// Get details of a Spot from an id 
router.get('/:spotId', async (req, res) => {
  
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAndCountAll({
      where: { spotId: spot.id },
      attributes: [
        [Spot.sequelize.fn('AVG', Spot.sequelize.col('stars')), 'avgStarRating']
      ]
    });

    const avgStarRating = parseFloat(reviews.rows[0].dataValues.avgStarRating).toFixed(1);

    const spotDetails = {
      ...spot.toJSON(),
      numReviews: reviews.count,
      avgStarRating: avgStarRating || null,
    };

    return res.status(200).json(spotDetails);
  } catch (err) {
    return res.status(500).json({ message: 'Error' });
  }
});





// Get all Reviews by a Spot's id （this url like /api/spots/:spotId/reviews,so =>spots.js)

router.get("/:spotId/reviews", async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      // { model: Spot},
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  return res.status(200).json({ Reviews: reviews });
});

// test
// {
//   "XSRF-Token": "z6PED6ws-rTetWgBJzf9U8jOQ5z0UGFGomIQ"
// }


// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const { user } = req;
  const owner = await spot.getOwner();
  
  if (user.id !== owner.id) {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      attributes: ["spotId", "startDate", "endDate"],
    });
    return res.status(200).json({ Bookings: bookings });
  } else {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    });
    return res.status(200).json({ Bookings: bookings });
  }
});



// end of this page
module.exports = router;