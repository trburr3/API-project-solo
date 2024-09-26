// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {User,Spot,SpotImage,Review,ReviewImage,Booking} = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

validateBooking = [
    check('startDate').custom(async value => {
        if (new Date(value) <= new Date()){
            throw new Error("startDate cannot be in the past")
        }
    }),
    check('endDate').custom(async (value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
            throw new Error("endDate cannot be on or before startDate");
          }
    }),
    handleValidationErrors
]


//edit a booking
router.put('/:bookingId', validateBooking, async (req, res, next) => {
    const { user } = req;

    const { startDate, endDate } = req.body;

    const bookingId = req.params.bookingId;

    const booking = Booking.findByPk(bookingId);

    console.log(booking.userId)
    console.log(user.id)

    if ( booking ){
        if (new Date(endDate) <= new Date()){
            res.status(403).json( {message: "Past bookings can't be modified"})
        }

        for(let attribute in req.body){
            booking[attribute] = req.body[attribute];
        }

        return res.json(booking)
    }

    return res.status(404).json( {message: "Booking couldn't be found"})
});

//

// end of this page
module.exports = router;