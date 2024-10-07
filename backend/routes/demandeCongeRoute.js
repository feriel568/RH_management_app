const express = require('express');
const router = express.Router();
const demandeCongeController = require('../controllers/demandeCongeController');

// Create a new DemandeConge
router.post('/', demandeCongeController.createDemandeConge);

// Get all DemandesConge
router.get('/', demandeCongeController.getAllDemandesConge);

// Get a single DemandeConge by ID
router.get('/:id', demandeCongeController.getDemandeCongeById);

// Update a DemandeConge by ID
router.put('/:id', demandeCongeController.updateDemandeConge);

// Delete a DemandeConge by ID
router.delete('/:id', demandeCongeController.deleteDemandeConge);

module.exports = router;
