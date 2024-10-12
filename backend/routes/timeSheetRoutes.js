const express = require('express');
const router = express.Router();
const { createTimeSheet,
    getTimeSheetsByUserId,
    getAllTimeSheets,
    changeTimeSheetStatus } = require('../controllers/timeSheetController'); 

router.post('/:userId', createTimeSheet);

router.get('/:userId' , getTimeSheetsByUserId);

router.get('/timesheets/all', getAllTimeSheets);

router.patch('/status/:timesheetId', changeTimeSheetStatus);

module.exports = router;
