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


exports.getDemandeCongeById = async (req, res) => {
    try {
        const demandeConge = await DemandeConge.findByPk(req.params.id);
        if (demandeConge) {
            res.status(200).json(demandeConge);
        } else {
            res.status(404).json({ message: 'Demande not found' });
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
