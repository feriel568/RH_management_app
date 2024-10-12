// Importer les modèles nécessaires

const { report } = require('../models/report'); 
const createReport = async (req, res) => {
  const { typerapport, dategeneration, contenu, userId } = req.body;

  try {
    const newReport = await req.report.create({
      typerapport,
      dategeneration,
      contenu,
      userId
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du rapport.' });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await req.report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des rapports.' });
  }
};

const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await req.report.findByPk(id);
    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: 'Rapport non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du rapport.' });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;
  const { typerapport, dategeneration, contenu } = req.body;

  try {
    const report = await req.report.findByPk(id);
    if (report) {
      report.typerapport = typerapport;
      report.dategeneration = dategeneration;
      report.contenu = contenu;
      await report.save();
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: 'Rapport non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du rapport.' });
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await req.report.findByPk(id);
    if (report) {
      await report.destroy();
      res.status(200).json({ message: 'Rapport supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'Rapport non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du rapport.' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
};
