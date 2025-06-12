const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/book', rideController.bookRide);
router.get('/history/:userId', rideController.getRideHistory);
router.put('/cancel/:rideId', rideController.cancelRide);

module.exports = router;
