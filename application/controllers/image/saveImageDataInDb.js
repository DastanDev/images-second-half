const saveImageDataInDb = async (req, res) => {
  const { name, imagePath, user } = req.body
  console.log(req.body)
  console.log('hey')
}

module.exports = saveImageDataInDb
