const Ride = require('../models/Ride');

exports.bookRide = async(req, res) => {
    const{userId, pickup, destination, distance, duration, fare, paymentMethod} = req.body;
    
    try{
        const ride = await Ride.create({
            userId,
            pickup,
            destination,
            distance,
            duration,
            fare,
            paymentMethod,
            status: 'requested'
        });

        res.status(201).json({
            message: "Ride booked successfully",
            ride
        });
    }catch(error){
        res.status(500).json({message: "Booking failed", error:error.message});
    }
};

exports.getRideHistory = async(req, res)=>{
    const{userId} = req.params;

    try{
        const rides = await Ride.findAll({
            where:{userId},
            include: [
        { model: require('../models/Driver'), attributes: ['id', 'username', 'email'] }
        ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ rides });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch history", error: error.message });
  }
};

exports.cancelRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = "cancelled";
    await ride.save();

    res.status(200).json({ message: "Ride cancelled", ride });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed", error: error.message });
  }
};

