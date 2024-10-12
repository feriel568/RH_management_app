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

// Get all timesheets created by one specific user
  const getTimeSheetsByUserId = async (req, res) => {

    const { userId } = req.params;
    try {
      const timeSheets = await req.TimeSheet.findAll({
        where: { userId }, 
      });      res.status(200).json(timeSheets);
    }catch (error) {
      console.error('Error retreiving timesheets for this user' , error)
      res.status(500).json({ message: 'Error retrieving timesheets', error });
    }

  };
// Get all timesheets 
  const getAllTimeSheets = async (req, res) => {
    try {
      const allTimeSheets = await req.TimeSheet.findAll();
    //  console.log(allTimeSheets);
      res.status(200).json(allTimeSheets);
    } catch (error) {
      console.error('Error retrieving timesheets:', error);
      res.status(500).json({ message: 'Error retrieving timesheets', error });
    }
  };
  // Approve or refuse timesheet's status
  const changeTimeSheetStatus = async (req, res) => {
    const { timesheetId } = req.params; 
    const { status } = req.body; 
  
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Allowed values are "approved" or "rejected".' });
    }
  
    try {
      // Find the timesheet by ID
      const timeSheet = await req.TimeSheet.findByPk(timesheetId);
      
      if (!timeSheet) {
        return res.status(404).json({ message: 'Timesheet not found' });
      }
  
      // Update the status
      timeSheet.status = status;
      await timeSheet.save();
  
      res.status(200).json({ message: `Timesheet ${status} successfully`, timeSheet });
    } catch (error) {
      console.error('Error updating timesheet status:', error);
      res.status(500).json({ message: 'Error updating timesheet status', error });
    }
  };
  
  module.exports = {
    createTimeSheet,
    getTimeSheetsByUserId,
    getAllTimeSheets,
    changeTimeSheetStatus
  };
  