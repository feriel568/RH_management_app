const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
} = require('../controllers/reportController');

// Routes pour CRUD des rapports
router.post('/', createReport);         // Créer un rapport
router.get('/', getAllReports);         // Récupérer tous les rapports
router.get('/:id', getReportById);      // Récupérer un rapport par ID
router.put('/:id', updateReport);       // Mettre à jour un rapport
router.delete('/:id', deleteReport);    // Supprimer un rapport

module.exports = router;
