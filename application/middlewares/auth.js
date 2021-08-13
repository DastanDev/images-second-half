const db = require('../helpers/db/connectDb')
const colors = require('colors')
const JWT = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.cookies.auth
  if (!token) {
    res.redirect('/login')
    return
  }
  const decodedUserId = JWT.verify(token, process.env.JWT_SECRET).id
  db.query(
    `SELECT * FROM User WHERE id = '${decodedUserId}'`,
    (err, result) => {
      if (err) {
        res.redirect(`/login?message=${err.message}`)
        return
      }
      //
      if (result.length < 1) {
        res.redirect(`/login?message=Not authorized.`)
        return
      }
      req.user = result[0]
      next()
    }
  )
}

module.exports = auth
