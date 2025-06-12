const User = require('../models/User');
const Ride = require('../models/Ride');
const Driver = require('../models/Driver');

exports.getUserProfile = async(req, res) => {
    try{
        const user= await User.findByPk(req.user.id);
        res.json(user);
    }catch(err){
        res.status(500).json({message: 'Error fetching user profile'});
    }
};

exports.updateUserProfile = async (req, res) => {
  try {
    await User.update(req.body, 
        { where: {
             id: req.user.id 
            } 
        });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

exports.viewAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({ 
        where: { 
            status: 'available' 
        } 
    });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching drivers' });
  }
};

exports.requestRide = async (req, res) => {
  try {
    const ride = await Ride.create({
      userId: req.user.id,
      pickup: req.body.pickup,
      destination: req.body.destination,
    });
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: 'Error requesting ride' });
  }
};

exports.cancelRide = async (req, res) => {
  try {
    await Ride.update({ status: 'cancelled' }, { where: { id: req.params.rideId, userId: req.user.id } });
    res.json({ message: 'Ride cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling ride' });
  }
};

exports.getRideStatus = async (req, res) => {
  try {
    const ride = await Ride.findByPk(req.params.rideId);
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ride status' });
  }
};
