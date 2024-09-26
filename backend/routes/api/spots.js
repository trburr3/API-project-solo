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
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({gt:-90, lt:90})
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({gt:-180, lt:180})
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({max:50})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isInt({min:0})
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min:0, max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const validateQuery = []

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



// Get details of a Spot from an id (four table)




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
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  return res.status(200).json({ Reviews: reviews });
});


//create a spot
router.post('/', validateSpot, async (req,res,next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const { user } = req;

  const newSpot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

  return res.status(201).json( newSpot );
});

//add image to spot based on spot id
router.post('/:spotId/images', async (req, res, next) => {
  const { url, preview } = req.body;

  const { user } = req;

  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if ( spot && spot.ownerId === user.id ) {
    const newSpotImage  = await SpotImage.create({ spotId, url, preview });

    return res.status(201).json( newSpotImage );
  }

  return res.status(404).json({message: "Spot couldn't be found"});
});

//edit a spot based on spot id
router.put('/:spotId', validateSpot, async(req, res, next) => {
  const spotId = req.params.spotId;

  const { user } = req;

  const spot = await Spot.findByPk(spotId);

 if ( spot && spot.ownerId === user.id ) {
  for(let attribute in req.body){
      spot[attribute] = req.body[attribute];
  }

  return res.json( spot );
 }

 if ( !spot ) return res.status(404).json({message: "Spot couldn't be found"});
});

//delete a spot based on spot id
router.delete('/:spotId', async (req,res,next) => {
  const spotId = req.params.spotId;

  console.log(req.params);

  const { user } = req;

  const spot = await Spot.findByPk(spotId);

  if ( spot && spot.ownerId === user.id ) {

    const spot = await Spot.destroy({
      where: {id: spotId}
    });

    return res.json( {message: "Successfully deleted."} )
  };

  return res.status(404).json({message: "Spot couldn't be found"});;
});

//creat a review based on spot id

router.post('/:spotId/reviews', validateReview, async (req, res, next) => {
  const { user } = req;

  const { review, stars } = req.body;

  const spotId = req.params.spotId;

  const userId = user.id;

  const spot = await Spot.findByPk(spotId);

  if (spot) {
    const newReview = await Review.create({ spotId, userId, review, stars});

    return res.status(201).json(newReview)
  }

  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

});



// end of this page
module.exports = router;