const fs = require('fs');
var suExec = require('su-exec');
const multer = require('multer')

const uploadDirectory = './upload';

suExec.init();
process.setgid('nogroup');
process.setuid('nobody');

suExec.destroy()
// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
            cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      cb(null,"music.wav");
    }
  });

  // Create the multer instance
const upload = multer({ storage: storage });

suExec.exec('./PiFmRds/src/pi_fm_rds -freq 97.0 -audio upload/music.wav')

module.exports = upload;