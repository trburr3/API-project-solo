// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//delete spotImage by image id

router.delete('/:imageId', async ( res, req, next ) => {
    const { user } = req;

    console.log('PARAMS SHOULD BE HERE:',`\n\n${req.params}\n\n`);

    console.log('URL SHOULD BE HERE',`\n\n${req.url}\n\n`);

    const imageId = req.params.imageId;

    const image  = await SpotImage.findByPk(imageId);

    const spot = await Spot.findByPk(image.spotId);

    if( image && spot.ownerId === user.id ) {
        await SpotImage.destroy({
            where: {imageId}
        });

        return res.json( {message: "Successfully deleted."} );
    }

    return res.status(404).json( {message: "Spot Image couldn't be found"});
})


// end of this page
module.exports = router;