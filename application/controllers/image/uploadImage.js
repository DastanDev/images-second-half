const upload = require('../../helpers/multer')
const colors = require('colors')
const db = require('../../helpers/db/connectDb')

const uploadImage = async (req, res) => {
  try {
    // saves photo in public/upload folder
    upload(req, res, async err => {
      if (err) {
        console.log(colors.red(err.message))
        return
      }
      if (!req.file) {
        res.redirect('/upload?message=Please select an image.')
        return
      }
      // if success
      // path of uploaded image
      const imagePath = `public/upload/${req.file.filename}`

      db.query(
        `INSERT INTO Image SET path='${imagePath}', name='Your image', user='${req.user.id}'`,
        (err, newImage) => {
          if (err) {
            console.log(colors.red(err.message))
            res.redirect('/upload')
            return
          }
          // if no error
          res.redirect(`/update/${newImage.insertId}`)
        }
      )
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = uploadImage
