// sets user to req.user
const JWT = require('jsonwebtoken')
const db = require('../helpers/db/connectDb')
const colors = require('colors')

const setUser = (req, res, next) => {
  const token = req.cookies.auth
  if (!token) {
    next()
    return
  }
  const decodedUserId = JWT.verify(token, process.env.JWT_SECRET).id
  db.query(
    `SELECT * FROM User WHERE id = '${decodedUserId}'`,
    (err, result) => {
      if (err) {
        console.log(colors.red(err.message))
      }
      //
      if (result.length < 1) {
        console.log(colors.red('User not found...'))
      }
      req.user = result[0]
      next()
    }
  )
}

module.exports = setUser
