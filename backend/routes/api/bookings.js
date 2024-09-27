// head of this page
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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
router.put('/:bookingId', validateBooking, requireAuth, async (req, res, next) => {
    const { user } = req;

    const { startDate, endDate } = req.body;

    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    const err = new Error('booking conflict');

    if ( booking ){

        if( booking.userId === user.id ){
            const startConflict= (booking.startDate === startDate);

        const endConflict = (booking.endDate === endDate);

        if (new Date(endDate) <= new Date()){
            return res.status(403).json( {message: "Past bookings can't be modified"})
        }
        if(startConflict){
            err.errors = {startDate: "Start date conflicts with an existing booking"};

            return res.status(403).json( {message: "Sorry, this spot is already booked for the specified dates"}, err.errors)
        } else if (endConflict) {
            err.errors = {endDate: "End date conflicts with an existing booking"};
            return res.status(403).json( {message: "Sorry, this spot is already booked for the specified dates"}, err.errors)
        } else if (startConflict && endConflict){
            err.errors = {startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking"};
            return res.status(403).json( {message: "Sorry, this spot is already booked for the specified dates"}, err.errors)
        }

        for(let attribute in req.body){
            booking[attribute] = req.body[attribute];
        }
            return res.json(booking);

        } else {

            return res.status(403).json( {message: "Authorization required."} );
        }

    }

    return res.status(404).json( {message: "Booking couldn't be found"})

});

 //delete a booking
router.delete('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;

    const { user } = req;

    const booking = await Booking.findByPk(bookingId);

    if (booking ){

        if( booking.userId === user.id ){

            if(booking.startDate >= new Date()){
                return res.status(403).json( {message: "Bookings that have been started can't be deleted"} );
            }
            await Booking.destroy({
                where: {id: bookingId}
            });
          return res.json( {message: "Successfully deleted"} );

        } else {

            return res.status(403).json( {message: "Authorization required."} );
        }

    }
    return res.status(404).json( {message: "Booking couldn't be found"});
  });



// end of this page
module.exports = router;