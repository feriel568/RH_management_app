const express = require('express');
const router = express.Router();
const EvaluationController = require('../controllers/evaluationController');

// Create a new Evaluation
router.post('/', EvaluationController.createEvaluation);

// Get all Evaluation
router.get('/', EvaluationController.getAllEvaluation);

// Get a single Evaluation by ID
router.get('/:userId', EvaluationController.getEvaluationByUserId);
router.get('/evaluation/:id', EvaluationController.getEvaluationById);

// Update a Evaluation by ID
router.put('/:id', EvaluationController.updateEvaluation);

// Delete a Evaluation by ID
router.delete('/:id', EvaluationController.deleteEvaluation);

module.exports = router;
