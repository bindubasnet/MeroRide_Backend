const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const driverDocumentController = require('../controllers/driverDocumentController');

router.post(
  "/kycsubmit",
  upload.fields([
    { name: "billbook", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "recentPhoto", maxCount: 1 },
  ]),
  driverDocumentController.submitKYC
);

router.patch("/kycstatus/:driverId", driverDocumentController.updateKYCStatus);

router.put(
  "/editkyc/:driverId",
  upload.fields([
    { name: "billbook", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "recentPhoto", maxCount: 1 },
  ]),
  driverDocumentController.editKYC
);

module.exports = router;
