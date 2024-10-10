const express = require('express');
const router = express.Router();
const { createTimeSheet } = require('../controllers/timeSheetController'); 

router.post('/:userId', createTimeSheet);

module.exports = router;
