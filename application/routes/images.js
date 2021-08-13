const router = require('express').Router()
const getAllImages = require('../controllers/image/getAllImages')
const getSingleImage = require('../controllers/image/getSingleImage')
const setUser = require('../middlewares/setUser')

// GET -> /images/:id
router.get('/:id', setUser, getSingleImage)

module.exports = router
