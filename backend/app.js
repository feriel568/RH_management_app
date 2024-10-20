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
const defineTimeSheetModel = require('./models/timeSheet'); 
const defineReportModel=require('./models/report');
const defineNotificationModel=require('./models/notification');

const Department = defineDepartmentModel(sequelize);
const User = defineUserModel(sequelize);
const DemandeConge = defineDemandeCongeModel(sequelize);
const TimeSheet = defineTimeSheetModel(sequelize, User);
const report=defineReportModel(sequelize);
const Notification = defineNotificationModel(sequelize);
// Define relationships
Department.hasMany(User, { as: 'users', foreignKey: 'departmentId' });
User.belongsTo(Department, { as: 'department', foreignKey: 'departmentId' });
User.hasMany(DemandeConge, { as: 'conges', foreignKey: 'userId' });
DemandeConge.belongsTo(User, { as: 'user', foreignKey: 'userId' });
TimeSheet.belongsTo(User, { as: 'user', foreignKey: 'userId' , onDelete: 'CASCADE' });

User.hasMany(report,{as:'reports',foreignKey:'userId' });
report.belongsTo(User,{as:'User',foreignKey:'userId'});
Notification.belongsTo(User , { as: 'User', foreignKey : 'userId'})


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
  req.DemandeConge = DemandeConge; 
  req.TimeSheet = TimeSheet;

  req.DemandeConge = DemandeConge; // If you're using this model as well
  req.report=report;
  req.Notification = Notification;
  next();
});




// Import routes
const departmentRoutes = require('./routes/departmentRoute');
const userRoutes = require('./routes/userRoute');
const demandeCongeRoutes = require('./routes/demandeCongeRoute');
const timeSheetRoutes = require('./routes/timeSheetRoutes');


const reportRoutes = require('./routes/reportRoute');
const notificationRoutes = require('./routes/notificationRouter');



// Use routes
app.use('/department', departmentRoutes);
app.use('/user', userRoutes);
app.use('/demandeconge', demandeCongeRoutes);

app.use('/timeSheet', timeSheetRoutes);


app.use('/report', reportRoutes);
app.use('/notification', notificationRoutes);
// Start server
app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
