const db = require('../../helpers/db/connectDb')

const updateImagePage = async (req, res) => {
  const { id } = req.params
  try {
    console.log(id, req.user.id)
    db.query(`SELECT * FROM Image WHERE id='${id}'`, (err, image) => {
      if (image[0].user.toString() !== req.user.id.toString()) {
        res.redirect(`/?message=Not authorized.`)
        return
      }

      res.render('update', {
        title: `Update ${image[0].name}`,
        user: req.user,
        image: image[0]
      })
    })
  } catch (error) {
    res.redirect(`/images/${id}`)
  }
}

module.exports = updateImagePage
