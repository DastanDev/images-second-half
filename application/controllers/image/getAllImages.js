// gets all images and renders index.js

const db = require('../../helpers/db/connectDb')
const colors = require('colors')

// HOME PAGE
const getAllImages = async (req, res) => {
  const { message } = req.query
  const { search } = req.query
  const dbQuery = search
    ? `select * from Image where name like concat('%', '${search}', '%') order by name like concat('${search}', '%') desc, ifnull(nullif(instr(name, concat(' ', '${search}')), 0), 99999), ifnull(nullif(instr(name, '${search}'), 0), 99999), name;`
    : `SELECT * FROM Image`
  db.query(dbQuery, (err, images) => {
    if (err) {
      console.log(colors.red(err.message))
      res.render('error', {
        message: 'Can not get images...',
        status: 500,
        stack: 'Internal Server Error...'
      })
      return
    }
    res.render('index', { images, user: req.user, title: 'Home', message })
  })
}

module.exports = getAllImages
