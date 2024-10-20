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
        const notifications = await req.Notification.findAll({ where: { userId , isRead : false} });

        await req.Notification.update(
            { isRead: true },
            { where: { userId, isRead: false } }
          );
        res.status(200).json(notifications);



    }catch(err){
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications' });

    }
}

const readNotifications = async (req , res) => {
    const { id } = req.params;
    try {
      const notification = await req.Notification.findByPk(id);
      if (!notification) return res.status(404).json({ error: 'Notification non trouvée' });
      
      notification.isRead = true;
      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la notification' });
    }
}




module.exports = 
{createNotification,
    getNotifications,
    readNotifications
};