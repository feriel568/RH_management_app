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


const getAllDepartments = async (req, res) => {
  try{
    const departments = await req.Department.findAll();
    res.status(200).json({
      message: 'Departments retrieved successfully',
      departments: departments
    });
  } catch (error) {
    console.log('Failed to retrieve departments:', error);
    res.status(500).json({
      message: 'Error retrieving departments:', error,
      error: error.message,
    });
  }
}

const getDepartmentById = async (req, res) => {
  try{
    const {id} = req.params;
    const department = await req.Department.findByPk(id);
    if(!department)
    {
      return res.status(404).json({
        message: 'Department not found',
      });
    }

    res.status(200).json({
      message: 'Department retrieved successfully',
      department,
    });
  }catch (error) {
    console.error('Failed to retrieve department:', error);
    res.status(500).json({
      message: 'Error retrieving department',
      error: error.message,
    });
  }

};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await req.Department.findByPk(id);

    if (!department) {
      return res.status(404).json({
        message: 'Department not found',
      });
    }

    department.name = name;  
    await department.save();

    res.status(200).json({
      message: 'Department updated successfully!',
      department,
    });
  } catch (error) {
    console.error('Failed to update department:', error);
    res.status(500).json({
      message: 'Error updating department',
      error: error.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await req.Department.findByPk(id);

    if (!department) {
      return res.status(404).json({
        message: 'Department not found',
      });
    }

    await department.destroy();  

    res.status(200).json({
      message: 'Department deleted successfully!',
    });
  } catch (error) {
    console.error('Failed to delete department:', error);
    res.status(500).json({
      message: 'Error deleting department',
      error: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
};

