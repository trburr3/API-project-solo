// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete image by review id

router.delete('/:imageId', requireAuth, async ( req, res, next ) => {
    const { user } = req;

    const imageId = req.params.imageId;

    const image  = await ReviewImage.findByPk(imageId);

    if( image ) {

        const review = await Review.findByPk(image.reviewId);

        if(review ) {

            if( review.userId === user.id ){

                await ReviewImage.destroy({
                    where: {id: imageId}
                });

                return res.json( {message: "Successfully deleted."} );
            } else {

                return res.status(403).json( {message: "Authorization required."} );
            }

        }

    }

    return res.status(404).json( {message: "Review Image couldn't be found"});
})


// end of this page
module.exports = router;