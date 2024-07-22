const router = require('express').Router();
const leadStatusesController = require('../controllers/LeadStatusesController');

// Get all lead statuses
router.get('/', async (req, res) => {
    const { result, error } = await leadStatusesController.listLeadStatuses();
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ data: result.data });
    } else {
        res.sendStatus(500);
    }
});

// Get a single lead status by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadStatusesController.getLeadStatus(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Create a new lead status
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const { result, error } = await leadStatusesController.addLeadStatus({ name, description });
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Update a lead status
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const { result, error } = await leadStatusesController.updateLeadStatus(id, updates);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead status updated' });
    } else {
        res.sendStatus(500);
    }
});

// Delete a lead status
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadStatusesController.deleteLeadStatus(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead status deleted.' });
    } else {
        res.sendStatus(500);
    }
});


module.exports = router;