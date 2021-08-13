const db = require('../../helpers/db/connectDb')
const colors = require('colors')
const hashPassword = require('../../helpers/hash/hashPassword')
const JWT = require('jsonwebtoken')

const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) throw Error('All fields are required...')
    const hashedPassword = await hashPassword(password)
    db.query(
      `INSERT INTO User SET username = '${username}', password = '${hashedPassword}'`,
      (err, result) => {
        if (err) {
          console.log(colors.red(err.message))
          res.redirect(`/register?message=${err.message}`)
          return
        }
        // if success
        const userId = result.insertId
        const token = JWT.sign({ id: userId }, process.env.JWT_SECRET)
        res.cookie('auth', token)
        res.redirect('/upload')
      }
    )
  } catch (error) {
    res.redirect(`/register?message=${error.message}`)
  }
}

module.exports = createNewUser
