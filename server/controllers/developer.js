const Developer = require('../models/developer');

// Get all developers
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find().populate('products');
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get developer by ID
exports.getDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id).populate('products');
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.status(200).json(developer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new developer
exports.createDeveloper = async (req, res) => {
  const developer = new Developer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    products: req.body.products,
  });

  try {
    const newDeveloper = await developer.save();
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update developer by ID
exports.updateDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    developer.firstName = req.body.firstName;
    developer.lastName = req.body.lastName;
    developer.products = req.body.products;
    const updatedDeveloper = await developer.save();
    res.status(200).json(updatedDeveloper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete developer by ID
exports.deleteDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    await developer.remove();
    res.status(200).json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
