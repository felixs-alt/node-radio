const fs = require('fs');

const multer = require('multer')

const uploadDirectory = './upload';

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
            cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      cb(null,"musidc.wav");
    }
  });

  // Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;