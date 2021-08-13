// generates a token so that authenticated users use
// to get access to protected pages
const JWT = require('jsonwebtoken')

// accepts user id and generates a token for that specific user id
const genAuthToken = id => {
  // JWT_SECRET must be set inside .env file
  return JWT.sign({ id }, process.env.JWT_SECRET)
}

module.exports = genAuthToken
