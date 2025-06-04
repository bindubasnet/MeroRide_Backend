const { log } = require('console');
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/driverdocuments/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
  
});





// File filter (allow only images)
const fileFilter = (req, file, cb) => {
  const allowTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if(allowTypes.includes(file.mimetype)){
    cb(null, true);
  }else{
    cb(new Error("Only JPG, JPEG, PNG files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
