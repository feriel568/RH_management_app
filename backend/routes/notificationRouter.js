const express = require('express')
const router = express.Router();


const {createNotification , getNotifications} = require('../controllers/notificationController');


router.post('/' , createNotification);
router.get('/:userId' , getNotifications);

module.exports = router;