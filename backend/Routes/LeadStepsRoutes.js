const router = require('express').Router();
const leadStepsController = require('../controllers/LeadStepsController');


// Get all lead steps
router.get('/', async (req, res) => {
    const { result, error } = await leadStepsController.listLeadSteps();
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ data: result.data });
    } else {
        res.sendStatus(500);
    }
});

// Get a single lead step by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadStepsController.getLeadStep(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Create a new lead step
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const { result, error } = await leadStepsController.addLeadStep({ name, description });
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Update a lead step
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const { result, error } = await leadStepsController.updateLeadStep(id, updates);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead step updated' });
    } else {
        res.sendStatus(500);
    }
});

// Delete a lead step
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadStepsController.deleteLeadStep(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead step deleted.' });
    } else {
        res.sendStatus(500);
    }
});


module.exports = router;