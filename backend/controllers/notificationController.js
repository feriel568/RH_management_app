const Notification = require('../models/notification');

const createNotification = async (req , res) => {  
    const {title, message,userId} = req.body;

    try{
        const notification = await req.Notification.create({title, message,userId})
        res.status(200).json(notification);
    }catch(err){
        res.status(500).json({message: err.message});

    }
}

module.exports = 
{createNotification};