const Department = require('../models/department.js')

const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const newDepartment = await req.Department.create({
      name: name,
    });

    res.status(201).json({
      message: 'Department created successfully!',
      department: newDepartment,
    });
  } catch (error) {
    console.error('Failed to create a new department:', error);
    res.status(500).json({
      message: 'Error creating department',
      error: error.message,
    });
  }
};

module.exports = {
  createDepartment,
};

