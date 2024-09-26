// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete image by review id

router.delete('/:imageId', async ( res, req, next ) => {
    const { user } = req;

    const imageId = req.params.imageId;

    console.log(req.params)

    const image  = await ReviewImage.findByPk(imageId);

    console.log(image)

    const review = await Review.findByPk(image.reviewId);

    if( image && review.userId === user.id ) {
        await ReviewImage.destroy({
            where: {imageId}
        });

        return res.json( {message: "Successfully deleted."} );
    }

    return res.status(404).json( {message: "Review Image couldn't be found"});
})


// end of this page
module.exports = router;