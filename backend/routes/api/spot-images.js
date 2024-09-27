// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete spotImage by image id

router.delete('/:imageId', requireAuth, async ( req, res, next ) => {
    const { user } = req;

    const imageId = req.params.imageId;

    const image  = await SpotImage.findByPk(imageId);

    if( image ) {

        const spotId = image.spotId;

        const spot = await Spot.findByPk(spotId);

        if( spot && spot.ownerId === user.id ) {
            await SpotImage.destroy({
                where: {id:imageId}
            });

            return res.json( {message: "Successfully deleted."} );
        }
    }

    return res.status(404).json( {message: "Spot Image couldn't be found"});
})


// end of this page
module.exports = router;