const express = require('express');
const router = express.Router();
const scrumMasterService = require('../services/scrumMasterService');

// Get all scrum masters
router.get('/', async (req, res, next) => {
  try {
    const scrumMasters = await scrumMasterService.getAllScrumMasters();
    res.status(200).json(scrumMasters);
  } catch (error) {
    next(error);
  }
});

// Get a scrum master by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const scrumMaster = await scrumMasterService.getScrumMasterById(id);
    if (!scrumMaster) {
      return res.status(404).json({ message: `Scrum master with ID ${id} not found` });
    }
    res.status(200).json(scrumMaster);
  } catch (error) {
    next(error);
  }
});

// Create a new scrum master
router.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const scrumMaster = await scrumMasterService.createScrumMaster(name);
    res.status(201).json(scrumMaster);
  } catch (error) {
    next(error);
  }
});

// Update an existing scrum master by ID
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedScrumMaster = await scrumMasterService.updateScrumMasterById(id, name);
    if (!updatedScrumMaster) {
      return res.status(404).json({ message: `Scrum master with ID ${id} not found` });
    }
    res.status(200).json(updatedScrumMaster);
  } catch (error) {
    next(error);
  }
});

// Delete a scrum master by ID
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedScrumMaster = await scrumMasterService.deleteScrumMasterById(id);
    if (!deletedScrumMaster) {
      return res.status(404).json({ message: `Scrum master with ID ${id} not found` });
    }
    res.status(200).json(deletedScrumMaster);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
