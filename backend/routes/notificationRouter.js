const express = require('express')
const router = express.Router();


const {createNotification , getNotifications , readNotifications} = require('../controllers/notificationController');


router.post('/' , createNotification);
router.get('/:userId' , getNotifications);
router.patch('/:id/read' , readNotifications);

module.exports = router;