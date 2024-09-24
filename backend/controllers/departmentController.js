const Department = require('../models/department')

const createDepartment = async (req, res) => {
    try {
        const newDepartment = await Department.create({
            name: req.body.name,
           
        });
        res.status(201).json(newDepartment);
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ message: 'Error creating department' });
    }
}


module.exports = {
    createDepartment,

}