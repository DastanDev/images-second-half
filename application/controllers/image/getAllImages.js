// gets all images and renders index.js

const db = require('../../helpers/db/connectDb')
const colors = require('colors')

// HOME PAGE
const getAllImages = async (req, res) => {
  db.query('SELECT * FROM Image', (err, images) => {
    if (err) {
      console.log(colors.red(err.message))
      res.render('error', {
        message: 'Can not get images...',
        status: 500,
        stack: 'Internal Server Error...'
      })
      return
    }
    res.render('index', { images, user: req.user })
  })
}

module.exports = getAllImages
