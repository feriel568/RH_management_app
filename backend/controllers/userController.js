const User = require('../models/user')
const Department = require('../models/department')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET 
const registerUser = async (req, res) => {
    try {
      const { name, email, role,phone,address, hireDate, salary, jobTitle,password,departmentId } = req.body;
  
      const department = await req.Department.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await req.User.create({
        name,
        email,
        role,
        phone,
        address,
        hireDate,
        salary,
        jobTitle,
        departmentId,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });
      res.status(201).json({
        message: 'User created successfully!',
        user: newUser,
        token,
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({
        message: 'Error creating user',
        error: error.message,
      });
    }
  };
  

  module.exports = {
    registerUser,
  }