const router = require('express').Router();
const leadsController = require('../controllers/LeadsController');

// Get all leads
router.get('/', async (req, res) => {
    const { result, error } = await leadsController.listLeads();

    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ data: result.data });
    } else {
        res.sendStatus(500);
    }
});

// Get a single lead by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const { result, error } = await leadsController.getLead(id);

    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Create a new lead
router.post('/', async (req, res) => {
    const { name, profileId, bdId, assigneeId, currentStep, status, description, resume } = req.body;
    const { result, error } = await leadsController.addLead({ name, profileId, bdId, assigneeId, currentStep, status, description, resume });

    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Update a lead
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const { result, error } = await leadsController.updateLead(id, updates);

    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: result.message });
    } else {
        res.sendStatus(500);
    }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const { result, error } = await leadsController.deleteLead(id);

    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: result.message });
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;









module.exports = router;