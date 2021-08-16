const db = require('../../helpers/db/connectDb')

const updateImage = async (req, res) => {
  try {
    const { name } = req.body
    const { id } = req.params
    db.query(
      `UPDATE Image SET name='${name}' WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          res.redirect('/?message=Internal server error.')
          console.log(err)
          return
        }
        res.redirect(`/images/${id}`)
      }
    )
  } catch (error) {
    res.redirect('/?message=Internal server error.')
  }
}

module.exports = updateImage
