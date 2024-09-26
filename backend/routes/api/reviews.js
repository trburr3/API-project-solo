// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//validator function
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

//Get all Reviews of the Current User

router.get("/current", async (req, res) => {

    const { user } = req;

    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Spot,
          attributes: { exclude: ["description", "createdAt", "updatedAt"] },
          include: [
            {
              model: SpotImage,
              attributes: ["url"],
              where: { preview: true },
              required: false,
              limit: 1,
            },
          ],
        },
        { model: ReviewImage, attributes: ["id", "url"] },
      ],
    });


    const reviewsWithDetails = reviews.map((review) => {
      const reviewJson = review.toJSON();

      const previewImage =
        reviewJson.Spot.SpotImages.length > 0
          ? reviewJson.Spot.SpotImages[0].url
          : "No preview image yet.";

      const reviewImages =
          reviewJson.ReviewImages.length > 0
            ? reviewJson.ReviewImages.map(image => ({ id: image.id, url: image.url }))
            : "No review image yet.";

      return {
        id: reviewJson.id,
        userId: reviewJson.userId,
        spotId: reviewJson.spotId,
        review: reviewJson.review,
        stars: reviewJson.stars,
        createdAt: formatTime(reviewJson.createdAt),
        updatedAt: formatTime(reviewJson.updatedAt),
        User: reviewJson.User,
        Spot: {
          id: reviewJson.Spot.id,
          ownerId: reviewJson.Spot.ownerId,
          address: reviewJson.Spot.address,
          city: reviewJson.Spot.city,
          state: reviewJson.Spot.state,
          country: reviewJson.Spot.country,
          lat: reviewJson.Spot.lat,
          lng: reviewJson.Spot.lng,
          name: reviewJson.Spot.name,
          price: reviewJson.Spot.price,
          previewImage: previewImage,
        },
        ReviewImages: reviewImages,
      };
    });
    return res.status(200).json({ Reviews: reviewsWithDetails });
  });


// Get all Reviews by a Spot's id （this url like /api/spots/:spotId/reviews,so =>spots.js)

//add an image to a review based on spot id

router.post('/:reviewId/images', async (req, res, next) => {
  const { user } = req;

  const { url } = req.body;

  const reviewId = req.params.reviewId;

  const review = await Review.findByPk(reviewId);

  const numImages = await ReviewImage.count({
    where: {
      reviewId
    }
  });

  if ( review && Review.userId === user.id ) {

    if (numImages <= 10) {
      const newReviewImage = await ReviewImage.create({ reviewId, url });

      return res.status(201).json(newReviewImage);
    }

    return res.status(403).json( {message: "Maximum number of images for this resource was reached"} )

  }

  return res.status(404).json( {message: "Reivew couldn't be found"});
});

//edit a review

router.put('/:reviewId', validateReview, async (req, res, next) => {
  const { user } = req;

  const reviewId = req.params.reviewId;

  const review = await Review.findByPk(reviewId);

  if ( review && review.userId === user.id ) {
    for(let attribute in req.body ) {
      review[attribute] = req.body[attribute];
    }

    return res.json( review );
  }

  return res.status(404).json( {message: "Reivew couldn't be found"});
});

//delete a review

router.delete('/:reviewId', async (req, res, next) => {
  const reviewId = req.params.reviewId;

  const { user } = req;

  const review = await Review.findByPk(reviewId);

  if (review && review.userId === user.id ){
    await Review.destroy({
      where: {id: reviewId}
    });

    return res.json( {message: "Review has been successfully deleted."} );
  }

  return res.status(404).json( {message: "Reivew couldn't be found"});
});

// end of this page
module.exports = router;