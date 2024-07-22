const router = require('express').Router();
const leadsController = require('../controllers/LeadsController');
const upload = require('../multerConfig');

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
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      const { name, profile_id, bd_id, assignee_id, current_step, status, description } = req.body;
      const resume = req.file ? req.file.path : null; // Get the file path
  
      const { result, error } = await leadsController.addLead({
        name,
        profile_id: Number(profile_id), // Assuming profileId should be a number
        bd_id: Number(bd_id),           // Assuming bdId should be a number
        assignee_id: Number(assignee_id), // Assuming assigneeId should be a number
        current_step: Number(current_step), // Assuming currentStep should be a number
        status: Number(status),
        description,
        resume,
      });
  
      if (error) {
        return res.status(400).send({ error });
      }
  
      res.status(201).send({ result });
    });
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