const db = require('../../helpers/db/connectDb')
const colors = require('colors')
const matchPassword = require('../../helpers/hash/matchPassword')
const genAuthToken = require('../../helpers/hash/genAuthToken')

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) throw Error('All fields are required...')
    let user
    db.query(
      `SELECT * FROM User WHERE username='${username}'`,
      async (err, result) => {
        if (err) {
          console.log(colors.red(err.message))
          res.redirect(`/login?message=${err.message}`)
          return
        }
        // if user exists
        if (result.length < 1) {
          console.log(colors.red('User not found'))
          res.redirect('/login?message=User does not exist')
          return
        }
        //
        const user = result[0]
        const passwordMatches = await matchPassword(user.password, password)
        //
        if (!passwordMatches) {
          console.log(colors.red('incorrect password...'))
          res.redirect('/login?message=Incorrect password.')
          return
        }
        //
        const token = genAuthToken(user.id)
        res.cookie('auth', token)
        res.redirect('/upload')
      }
    )
  } catch (error) {
    res.redirect(`/login?message=${error.message}`)
  }
}

module.exports = loginUser
