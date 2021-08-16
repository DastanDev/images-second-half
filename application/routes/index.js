var express = require('express')
var router = express.Router()
const uploadImage = require('../controllers/image/uploadImage')
const auth = require('../middlewares/auth')
const setUser = require('../middlewares/setUser')
const getAllImages = require('../controllers/image/getAllImages')
const createNewComment = require('../controllers/comment/createNewComment')
const saveImageDataInDb = require('../controllers/image/saveImageDataInDb')
const updateImage = require('../controllers/image/updateImage')
const updateImagePage = require('../controllers/image/updateImagePage')

router.get('/', setUser, getAllImages)

router.get('/login', setUser, (req, res) => {
  const { message } = req.query
  if (req?.user) {
    res.redirect('/upload')
    return
  }
  res.render('login', { message, title: 'Login' })
})

router.get('/register', setUser, (req, res) => {
  const { message } = req.query
  if (req.user) {
    res.redirect('/upload')
    return
  }
  res.render('register', { message, title: 'Register', user: req.user })
})

router.get('/logout', (req, res) => {
  res.clearCookie('auth')
  res.redirect('/login')
})

router
  .route('/upload')
  .get(auth, (req, res) => {
    const { message } = req.query
    res.render('upload', { user: req.user, message, title: 'Upload' })
  })
  .post(auth, uploadImage)

router.route('/upload/save').post(saveImageDataInDb)

router.post('/comment', auth, createNewComment)

router.get('/update/:id', auth, updateImagePage)

router.post('/update/:id', auth, updateImage)
module.exports = router
