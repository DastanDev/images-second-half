const multer = require('multer')
const storage = multer.diskStorage({
  destination: './application/public/upload/',
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}.jpeg`)
  }
})

const upload = multer({
  storage: storage
}).single('myImage')

module.exports = upload
