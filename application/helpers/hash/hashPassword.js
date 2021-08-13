const bcrypt = require('bcryptjs')

// hashes the password before saving to database
const hashPassword = async password => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

module.exports = hashPassword
