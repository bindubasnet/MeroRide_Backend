const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require('./routes/driverRoutes');
const roleRoutes = require('./routes/roleRoutes');
const app = express();
const cors = require('cors')
const rideRoutes = require('./routes/rideRoutes');
const driver = require("./models/driver")
const DriverDocument = require("./models/driverDocuments")
const OTP = require("./models/OTP")
const Ride = require("./models/Ride")
const Role = require("./models/Role")
const User = require("./models/User")


const driverdocumentRoutes = require('./routes/driverdocumentRoutes');
const port = process.env.PORT || 3301;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,               
}));

app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

app.get("/", (req, res) =>{
    res.send("Welcome to MeroRide Backend Server");
});

// Use the driver document routes
app.use('/api/driver-documents', driverdocumentRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/rides', rideRoutes);

sequelize.sync({ alter: true })

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// sequelize.authenticate().then(() => {
//     console.log("DB connected successfully.");
//     sequelize.sync({alter:"true" });
//   })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to DB:", err);
//   });

