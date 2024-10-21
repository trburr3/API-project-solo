// head of this page
const express = require('express')
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

// add this line in week13d4
const { formatTime, formatDate } = require("../../utils/formattime");

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//need to figure out authorization response

// maybe we need validate
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true })
  .withMessage("City is required"),
  check("state").exists({ checkFalsy: true })
  .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
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

const validateQuery = [
  check("page")
  .isInt({ min: 1, max: 10 })
  .optional()
  .withMessage("Page must be greater than or equal to 1"),
check("size")
  .isInt({ min: 1, max: 20 })
  .optional()
  .withMessage("Size must be greater than or equal to 1"),
check("maxLat")
  .isFloat({ min: -90, max: 90 })
  .optional()
  .withMessage("Maximum latitude is invalid"),
check("minLat")
  .isFloat({ min: -90, max: 90 })
  .optional()
  .withMessage("Minimum latitude is invalid"),
check("maxLng")
  .isFloat({ min: -180, max: 180 })
  .optional()
  .withMessage("Maximum longitude is invalid"),
check("minLng")
  .isFloat({ min: -180, max: 180 })
  .optional()
  .withMessage("Minimum longitude is invalid"),
check("maxPrice")
  .isFloat({ min: 0 })
  .optional()
  .withMessage("Maximum price must be greater than or equal to 0"),
check("minPrice")
  .isFloat({ min: 0 })
  .optional()
  .withMessage("Minimum price must be greater than or equal to 0"),
handleValidationErrors,
];


// Get all Spots
// need three model:user;review(avgRating);spotimage(previewImage)

router.get("/", validateQuery,async (req, res) => {
  const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  const limit = Math.min(parseInt(size) || 20, 20);
  const offset = limit * (page - 1);

  const where = {};
  if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
  if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
  if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
  if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
  if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice)
    where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

  const spots = await Spot.findAll({
    where,
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
    group: ["Spot.id", "SpotImages.id"],
    subQuery: false,
  });

  const spotsWithDetails = spots.map((spot) => {
    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: Number(spot.lat),
      lng: Number(spot.lng),
      name: spot.name,
      description: spot.description,
      price: Number(spot.price),
      createdAt: formatTime(spot.createdAt),
      updatedAt: formatTime(spot.updatedAt),
      avgRating: spot.dataValues.avgRating
        ? parseFloat(spot.dataValues.avgRating).toFixed(1)
        : "No rating yet.",
      previewImage: spot.SpotImages.length
        ? spot.SpotImages[0].url
        : "No preview image yet.",
    };
  });

  return res.status(200).json({
    Spots: spotsWithDetails,
    page: parseInt(page),
    size: parseInt(size),
  });

  });





// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

    const spots = await Spot.findAll({
      where: { ownerId: user.id },
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
      group: ["Spot.id", "SpotImages.id"],
    });

    const spotDetails = spots.map((spot) => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat.toString(),
      lng: spot.lng.toString(),
      name: spot.name,
      description: spot.description,
      price: spot.price.toString(),
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
      previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : "No preview image yet."
    }));

    return res.status(200).json({ Spots: spotDetails });
});



// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
// const { spotId } = req.params;

// const spot1 = await Spot.findByPk(req.params.spotId);
// if (!spot1) {
//   return res.status(404).json({ message: "Spot couldn't be found" });
// }

  const spot = await Spot.findByPk(req.params.spotId, {
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
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ],
    group: ['Spot.id', 'Owner.id', 'SpotImages.id']
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const reviewsCount = await Review.count({
    where: { spotId: spot.id },
    // attributes: [
    //   [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStarRating']
    // ]
  });
  spot.dataValues.numReviews = reviewsCount;

  // const avgStarRating = parseFloat(reviews.rows[0].dataValues.avgStarRating).toFixed(1);

  const spotDetails = {
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
    numReviews: spot.dataValues.numReviews,
    avgStarRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : "No rating yet.",
    SpotImages: spot.SpotImages,
    Owner: spot.Owner
  };

  return res.status(200).json(spotDetails);


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
router.get("/:spotId/bookings", async (req, res) => {
const spot = await Spot.findByPk(req.params.spotId);

if (!spot) {
  return res.status(404).json({
    message: "Spot couldn't be found",
  });
}

const { user } = req;
// const owner = await spot.getOwner();
const owner = spot.ownerId;

if (user.id !== owner) {
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


//create a spot
router.post('/', requireAuth, validateSpot, async (req,res,next) => {
const { address, city, state, country, lat, lng, name, description, price } = req.body;

const { user } = req;

const newSpot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

return res.status(201).json( newSpot );
});

//add image to spot based on spot id
router.post('/:spotId/images',  requireAuth, async (req, res, next) => {
const { url, preview } = req.body;

const { user } = req;

const spotId = req.params.spotId;

const spot = await Spot.findByPk(spotId);

// if ( spot && spot.ownerId === user.id ) {
//   const newSpotImage  = await SpotImage.create({ spotId, url, preview });

//   return res.status(201).json( newSpotImage );
// }else{
//   return res.status(403).json({
//     message: "Forbidden",
//   });
// }

// return res.status(404).json({message: "Spot couldn't be found"});

if (spot) {
  if (spot.ownerId === user.id) {
    const newSpotImage = await SpotImage.create({ spotId, url, preview });

    return res.status(201).json(newSpotImage);
  } else {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
} else {
  return res.status(404).json({
    message: "Spot couldn't be found",
  });
}
});

//edit a spot based on spot id
router.put('/:spotId', requireAuth,validateSpot, async(req, res, next) => {
const spotId = req.params.spotId;

const { user } = req;

const spot = await Spot.findByPk(spotId);

//  if ( spot && spot.ownerId === user.id ) {
//   for(let attribute in req.body){
//       spot[attribute] = req.body[attribute];
//   }

//   return res.json( spot );

//  }

//   return res.status(404).json({message: "Spot couldn't be found"});
// });

if (spot) {
if (spot.ownerId === user.id) {
  for (let attribute in req.body) {
    spot[attribute] = req.body[attribute];
  }

  return res.json(spot);
} else {
  return res.status(403).json({
    message: "Forbidden",
  });
}
} else {
return res.status(404).json({
  message: "Spot couldn't be found",
});
}
});



//delete a spot based on spot id
router.delete('/:spotId', requireAuth,async (req,res,next) => {
const spotId = req.params.spotId;

console.log(req.params);

const { user } = req;

const spot = await Spot.findByPk(spotId);

// if ( spot && spot.ownerId === user.id ) {

//   const spot = await Spot.destroy({
//     where: {id: spotId}
//   });

//   return res.json( {message: "Successfully deleted."} )
// };

// return res.status(404).json({message: "Spot couldn't be found"});;

if (spot) {
  if (spot.ownerId === user.id) {
    await Spot.destroy({
      where: { id: spotId }
    });

    return res.json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
} else {
  return res.status(404).json({
    message: "Spot couldn't be found"
  });
}
});

//creat a review based on spot id

router.post('/:spotId/reviews',requireAuth, validateReview, async (req, res, next) => {
const { user } = req;

const { review, stars } = req.body;

const spotId = req.params.spotId;

const userId = user.id;

const spot = await Spot.findByPk(spotId);

// if (spot) {
//   const newReview = await Review.create({ spotId, userId, review, stars});

//   return res.status(201).json(newReview)
// }

if (!spot) {
  return res.status(404).json({message: "Spot couldn't be found"});
}

const previousReview = await Review.findOne({
  where: { userId: user.id, spotId: spot.id },
});
if (previousReview) {
  return res.status(500).json({
    message: "User already has a review for this spot",
  });
}

if (spot) {
  const newReview = await Review.create({ spotId, userId, review, stars});

  return res.status(201).json(newReview)
}

});



// end of this page
module.exports = router;