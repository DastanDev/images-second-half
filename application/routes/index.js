var express = require('express')
var router = express.Router()
const uploadImage = require('../controllers/image/uploadImage')
const auth = require('../middlewares/auth')
const setUser = require('../middlewares/setUser')
const getAllImages = require('../controllers/image/getAllImages')
const createNewComment = require('../controllers/comment/createNewComment')

router.get('/', setUser, getAllImages)

router.get('/login', setUser, (req, res) => {
  const { message } = req.query
  if (req?.user) {
    res.redirect('/upload')
    return
  }
  res.render('login', { message })
})

router.get('/register', setUser, (req, res) => {
  const { message } = req.query
  if (req.user) {
    res.redirect('/upload')
    return
  }
  res.render('register', { message })
})

router.get('/logout', (req, res) => {
  res.clearCookie('auth')
  res.redirect('/login')
})

router
  .route('/upload')
  .get(auth, (req, res) => {
    res.render('upload', { user: req.user })
  })
  .post(auth, uploadImage)

router.post('/comment', auth, createNewComment)
module.exports = router
