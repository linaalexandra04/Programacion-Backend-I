const bcrypt = require('bcrypt');

function generateUsers(count) {
  const roles = ['user', 'admin'];
  const password = bcrypt.hashSync('coder123', 10);

  return Array.from({ length: count }).map((_, i) => ({
    _id: `mock_user_${i + 1}`,
    username: `mockuser${i + 1}`,
    email: `mockuser${i + 1}@example.com`,
    password,
    role: roles[Math.floor(Math.random() * roles.length)],
    pets: [],
  }));
}

function generatePets(count) {
  const types = ['dog', 'cat', 'bird', 'fish'];
  return Array.from({ length: count }).map((_, i) => ({
    _id: `mock_pet_${i + 1}`,
    name: `mockpet${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    age: Math.floor(Math.random() * 10) + 1,
  }));
}

module.exports = { generateUsers, generatePets };
