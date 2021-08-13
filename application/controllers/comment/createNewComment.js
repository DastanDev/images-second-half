const db = require('../../helpers/db/connectDb')
const colors = require('colors')

const createNewComment = async (req, res) => {
  const { content, imageId } = req.body
  db.query(
    `INSERT INTO Comment SET author='${req.user.id}', content='${content}', image='${imageId}'`,
    (err, result) => {
      if (err) {
        console.log(colors.red(err.message))
      }
      res.redirect(`/images/${imageId}`)
    }
  )
}

module.exports = createNewComment
