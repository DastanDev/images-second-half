var router = require('express').Router()

const createNewUser = require('../controllers/user/createNewUser')
const loginUser = require('../controllers/user/loginUser')

// create new user
router.post('/create', createNewUser)

// login user
router.post('/login', loginUser)

/* GET users listing. */
// router.route('/').get('/')

module.exports = router
