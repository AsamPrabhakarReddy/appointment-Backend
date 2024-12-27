const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.Controller')

router.post('/BookingSlot', appointmentController.BookingSlots);

module.exports = router;
