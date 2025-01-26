const { Router } = require('express');
const bcrypt = require('bcrypt');
const { generateUsers, generatePets } = require('../utils/mocking');
const User = require('../models/user');
const Pet = require('../models/pet');

const router = Router();

router.get('/mockingpets', async (req, res) => {
  try {
    const pets = generatePets(10); 
    res.json({ pets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/mockingusers', (req, res) => {
  const users = generateUsers(50); 
  res.json(users);
});

router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ error: 'Parámetros "users" y "pets" son obligatorios' });
    }

    const userData = generateUsers(users);
    await User.insertMany(userData);

    const petData = generatePets(pets);
    await Pet.insertMany(petData);

    res.json({ message: 'Datos generados e insertados exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;