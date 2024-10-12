const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Sequelize } = require('sequelize');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

// Import models
const defineDepartmentModel = require('./models/department');
const defineUserModel = require('./models/user');
const defineDemandeCongeModel = require('./models/Demandeconge');
const defineReportModel=require('./models/report');
const Department = defineDepartmentModel(sequelize);
const User = defineUserModel(sequelize);
const DemandeConge = defineDemandeCongeModel(sequelize);

const report=defineReportModel(sequelize);
// Define relationships
Department.hasMany(User, { as: 'users', foreignKey: 'departmentId' });
User.belongsTo(Department, { as: 'department', foreignKey: 'departmentId' });
User.hasMany(DemandeConge, { as: 'conges', foreignKey: 'userId' });
DemandeConge.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(report,{as:'reports',foreignKey:'userId'});
report.belongsTo(User,{as:'User',foreignKey:'userId'});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch(err => {
  console.error('Error syncing database:', err);
});
// app.js
app.use((req, res, next) => {
  req.User = User;
  req.Department = Department;
  req.DemandeConge = DemandeConge; // If you're using this model as well
  req.report=report;
  next();
});




// Import routes
const departmentRoutes = require('./routes/departmentRoute');
const userRoutes = require('./routes/userRoute');
const demandeCongeRoutes = require('./routes/demandeCongeRoute');
const reportRoutes = require('./routes/reportRoute');

// Use routes
app.use('/department', departmentRoutes);
app.use('/user', userRoutes);
app.use('/demandeconge', demandeCongeRoutes);
app.use('/report', reportRoutes);
// Start server
app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
