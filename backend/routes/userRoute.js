const express = require('express')
const router = express.Router()

const {registerUser} = require('../controllers/userController')
router.post('/create' , registerUser);


module.exports = router;