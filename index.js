const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const sequelize = require("./db");
const User = require("./models/user");
const Driver = require("./models/driver");
const driverdocuments =require("./models/driverdocuments");
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require('./routes/driverRoutes');
const roleRoutes = require('./routes/roleRoutes');
const app = express();
const driverdocumentRoutes = require('./routes/driverdocumentRoutes');
const port = process.env.PORT || 3301;

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

sequelize.authenticate().then(() => {
    console.log("DB connected successfully.");
    sequelize.sync({ });
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to DB:", err);
  });
