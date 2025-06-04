const DriverDocument = require('../models/driverdocuments');
const Driver =require('../models/driver');
const fs =  require('fs');
const { where } = require('sequelize');
const { log } = require('console');

exports.uploadDriverDocuments = async (req, res) => {

  const { driverId } = req.body;
  const { license, billbook, recentPhoto } = req.files;


  try {
    if (!license || !billbook|| !recentPhoto) {
      clearErrorFile(license, billbook, recentPhoto)
      return res.status(400).json({ message: "All three images are required." });
    }

    const existingDoc = await DriverDocument.findOne({where:{driverId: driverId}});
    console.log(existingDoc);
    

    if(existingDoc){
      clearErrorFile(license, billbook, recentPhoto);
      return res.status(400).json({message:"Driver document already exist! Update if required!"})
    }

    const document = await DriverDocument.create({
      driverId,
      license:license[0].path,
      billbook:billbook[0].path,
      recentPhoto: recentPhoto[0].path,
    });

    res.status(201).json({ message: "Driver documents uploaded successfully", document });
  } catch (error) {
    clearErrorFile(license, billbook, recentPhoto);
    res.status(500).json({ message: "Error uploading documents", error: error.message });
  }
};

const deleteFile = (filePath) =>{
  fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete ${filePath}:`, err.message);
      });
}

const clearErrorFile = (license, billbook, recentPhoto) =>{
  if(license){
    deleteFile(license[0].path);
    }
  if(billbook){
    deleteFile(billbook[0].path);
      }
  if(recentPhoto){
    deleteFile(recentPhoto[0].path);
  }
}

