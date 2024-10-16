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


  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await req.User.findOne({ where: { email: email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log("Stored hashed password:", user.password); // Log du mot de passe haché
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Failed to log in:', error);
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await req.User.findAll();
      res.status(200).json({
        message: 'Users retrieved successfully',
        users: users,
      });
    } catch (error) {
      console.error('Failed to retrieve users:', error); 
      res.status(500).json({
        message: 'Error retrieving users', 
        error: error.message, 
      });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await req.User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy(); 
      res.status(200).json({ message: 'User deleted successfully with related records' });
    } catch (error) {
      console.error('Failed to delete user:', error);
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser
  }