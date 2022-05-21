const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, 'image' + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    //  cb(null, true);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/webp" ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
};

let upload = multer({
    storage: storage,
   
    fileFilter: fileFilter,
});

module.exports = upload.single('photo')