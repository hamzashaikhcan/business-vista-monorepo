const router = require('express').Router();
const leadProfilesController = require('../controllers/LeadProfilesController');


// Get all lead profiles
router.get('/', async (req, res) => {
    const { result, error } = await leadProfilesController.listLeadProfiles();
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ data: result.data });
    } else {
        res.sendStatus(500);
    }
});

// Get a single lead profile by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadProfilesController.getLeadProfile(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Create a new lead profile
router.post('/', async (req, res) => {
    const { name } = req.body;
    const { result, error } = await leadProfilesController.addLeadProfile({ name });
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json(result.data);
    } else {
        res.sendStatus(500);
    }
});

// Update a lead profile
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const { result, error } = await leadProfilesController.updateLeadProfile(id, updates);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead profile updated' });
    } else {
        res.sendStatus(500);
    }
});

// Delete a lead profile
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { result, error } = await leadProfilesController.deleteLeadProfile(id);
    if (error) {
        res.status(error.status).json({ message: error.message });
    } else if (result) {
        res.status(result.status).json({ message: 'Lead profile deleted.' });
    } else {
        res.sendStatus(500);
    }
});


module.exports = router;