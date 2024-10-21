const { Evaluation } = require('../models');

exports.createEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body);
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvaluation = async (req, res) => {
    try {
        const evaluations = await Evaluation.findAll();
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvaluationByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const evaluations = await Evaluation.findAll({
            where: { userId: userId },
        });

        if (evaluations.length > 0) {
            res.status(200).json(evaluations);
        } else {
            res.status(404).json({ message: 'No evaluations found for this user' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvaluation = async (req, res) => {
    const { id } = req.params;
    const { score, commentaire, dateevaluation } = req.body;

    try {
        const evaluation = await Evaluation.findByPk(id);

        if (!evaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }

        evaluation.score = score !== undefined ? score : evaluation.score;
        evaluation.commentaire = commentaire !== undefined ? commentaire : evaluation.commentaire;
        evaluation.dateevaluation = dateevaluation !== undefined ? dateevaluation : evaluation.dateevaluation;

        await evaluation.save();
        return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating evaluation', error: error.message });
    }
};

exports.getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByPk(req.params.id);
        
        if (evaluation) {
            res.status(200).json(evaluation);
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByPk(req.params.id);
        if (evaluation) {
            await evaluation.destroy();
            res.status(200).json({ message: 'Evaluation deleted' });
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
