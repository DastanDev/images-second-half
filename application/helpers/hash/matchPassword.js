// confirms if the hashed passwords are equal
const bcrypt = require('bcryptjs')

const matchPassword = async (oldPassword, newPassword) => {
  return await bcrypt.compare(newPassword, oldPassword)
}

module.exports = matchPassword
