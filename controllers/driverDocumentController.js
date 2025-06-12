const DriverDocument = require('../models/driverDocuments');
const Driver =require('../models/driver');
const fs =  require('fs');
const { where } = require('sequelize');
const { log } = require('console');

exports.submitKYC = async (req, res) => {
  const { driverId } = req.body;
  const { license, billbook, recentPhoto } = req.files;
  const{vehicleType, vehicleNumber} = req.body;

  try {
    if (!license || !billbook|| !recentPhoto|| !vehicleType|| !vehicleNumber) {
      clearErrorFile(license, billbook, recentPhoto);
      return res.status(400).json({ message: "All KYC fields are required." });
    }

    const existingDoc = await DriverDocument.findOne({where:{driverId: driverId}});
    // console.log(existingDoc);
    if(existingDoc){
      clearErrorFile(license, billbook, recentPhoto);
      return res.status(400).json({message:"KYC already exist! Update if required!"})
    }

    const document = await DriverDocument.create({
      driverId,
      vehicleType,
      vehicleNumber,
      license:license[0].path,
      billbook:billbook[0].path,
      recentPhoto: recentPhoto[0].path,
      kycStatus: "Pending"
    });

    res.status(201).json({ message: "KYC submitted successfully", document });
  } catch (error) {
    clearErrorFile(license, billbook, recentPhoto);
    res.status(500).json({ message: "Error submitting KYC", error: error.message });
  }
};

exports.updateKYCStatus = async (req, res) => {
  const { driverId } = req.params;
  const { status } = req.body;

  try {
    const updated = await DriverDocument.update(
      { kycStatus: status },
      { where: { driverId } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Driver document not found" });
    }

    res.status(200).json({ message: `KYC status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating KYC status", error: error.message });
  }
};

exports.editKYC = async (req, res) => {
  const { driverId } = req.params;
  const { license, billbook, recentPhoto } = req.files;
  const {vehicleType, vehicleNumber} = req.body;

  try {
    const doc = await DriverDocument.findOne({ where: { driverId } });

    if (!doc) {
      clearErrorFile(license, billbook, recentPhoto);
      return res.status(404).json({ message: "Driver KYC not found" });
    }

    if (license) deleteFile(doc.license);
    if (billbook) deleteFile(doc.billbook);
    if (recentPhoto) deleteFile(doc.recentPhoto);

    await DriverDocument.update(
      {
        vehicleType: vehicleType || doc.vehicleType,
        vehicleNumber: vehicleNumber || doc.vehicleNumber,
        license: license ? license[0].path : doc.license,
        billbook: billbook ? billbook[0].path : doc.billbook,
        recentPhoto: recentPhoto ? recentPhoto[0].path : doc.recentPhoto,
        kycStatus: "Pending" 
      },
      { where: { driverId } }
    );

    res.status(200).json({ message: "KYC updated successfully" });
  } catch (error) {
    clearErrorFile(license, billbook, recentPhoto);
    res.status(500).json({ message: "Error updating KYC", error: error.message });
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

