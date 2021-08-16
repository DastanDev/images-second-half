const db = require('../../helpers/db/connectDb')
const colors = require('colors')

const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params
    db.query(
      `SELECT Image.name, Image.id, Image.user, Image.path, User.username FROM Image JOIN User ON User.id=Image.user WHERE Image.id='${id}'`,
      (err, result) => {
        if (err) {
          console.log(colors.red(err.message))
          res.redirect('/')
          return
        }
        db.query(
          `SELECT Comment.content, Comment.author, User.username FROM Comment JOIN User ON User.id = Comment.author WHERE image='${id} ORDER BY Comment.id DESC'`,
          (err, comments) => {
            if (err) {
              console.log(colors.red(err.message))
              res.redirect('/')
              return
            }
            // if no error

            res.render('imageDetails', {
              image: result[0],
              comments: comments.reverse(),
              user: req.user,
              title: `Image ${result[0].name}`
            })
          }
        )
      }
    )
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = getSingleImage
