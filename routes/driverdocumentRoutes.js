const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const driverDocumentController = require('../controllers/driverDocumentController');

router.post(
  "/upload",
  upload.fields([
    { name: "billbook", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "recentPhoto", maxCount: 1 },
  ]),
  driverDocumentController.uploadDriverDocuments
);


module.exports = router;
