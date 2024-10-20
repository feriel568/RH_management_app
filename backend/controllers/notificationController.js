const Notification = require('../models/notification');

const createNotification = async (req , res) => {  
    const {title, message,userId} = req.body;

    try{
        const notification = await req.Notification.create({ title, message,userId})
        res.status(200).json(notification);
    }catch(err){
        res.status(500).json({message: err.message});

    }
}

const getNotifications = async (req , res) => {
    const {userId} = req.params;

    try{
        const notifications = await req.Notification.findAll({ where: { userId } });
        res.status(200).json(notifications);

    }catch(err){
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications' });

    }
}






module.exports = 
{createNotification,
    getNotifications
};