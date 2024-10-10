const User = require('../models/user')
const TimeSheet = require('../models/timeSheet');
const { model } = require('mongoose');
const createTimeSheet = async (req, res) => {
    const { userId } = req.params; 
    const { workDays, totalHours, status } = req.body;
  
    try {
      const newTimeSheet = await req.TimeSheet.create({
        workDays,
        totalHours,
        status,
        userId, 
      });
  
      res.status(201).json(newTimeSheet);
    } catch (error) {
      console.error('Error creating timesheet:', error);
      res.status(500).json({ message: 'Error creating timesheet', error });
    }
  };
  
  module.exports = {
    createTimeSheet,
  };
  