// Import the model
const { DemandeConge } = require('../models'); 

exports.createDemandeConge = async (req, res) => {
    try {
        const demandeConge = await DemandeConge.create(req.body);
        res.status(201).json(demandeConge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllDemandesConge = async (req, res) => {
    try {
        const demandesConge = await DemandeConge.findAll();
        res.status(200).json(demandesConge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getDemandesByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request params
        console.log('User ID:', userId); // Log the userId for debugging

        if (!userId) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const demandes = await DemandeConge.findAll({
            where: { userId: userId }, // Ensure this is correct
        });

        if (demandes.length > 0) {
            res.status(200).json(demandes);
        } else {
            res.status(404).json({ message: 'No demandes found for this user' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateDemandeConge = async (req, res) => {
    try {
        const demandeConge = await DemandeConge.findByPk(req.params.id);
        if (demandeConge) {
            await demandeConge.update(req.body);
            res.status(200).json(demandeConge);
        } else {
            res.status(404).json({ message: 'Demande not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getDemandeCongeById = async (req, res) => {
    try {
        const demandeConge = await DemandeConge.findByPk(req.params.id);
        
        if (demandeConge) {
            // Demande found, return it
            res.status(200).json(demandeConge);
        } else {
            // Demande not found
            res.status(404).json({ message: 'Demande not found' });
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDemandeConge = async (req, res) => {
    try {
        const demandeConge = await DemandeConge.findByPk(req.params.id);
        if (demandeConge) {
            await demandeConge.destroy();
            res.status(200).json({ message: 'Demande deleted' });
        } else {
            res.status(404).json({ message: 'Demande not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
