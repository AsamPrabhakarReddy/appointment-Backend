const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.Controller')

router.post('/BookingSlot', appointmentController.BookingSlots);
router.post('/getDataById', appointmentController.getDataById);
// router.post('/getDataByEmail', appointmentController.getDataByEmail);
// router.post('/getDataByTime', appointmentController.getDataByTime);
// router.post('/getData', appointmentController.getDataByTime);
router.get('/getDateAndSlots', appointmentController.getDateAndSlots);
router.post('/deleteAppointment', appointmentController.deleteAppointment);
router.post('/updateAppointment', appointmentController.updateAppointment);

module.exports = router;

