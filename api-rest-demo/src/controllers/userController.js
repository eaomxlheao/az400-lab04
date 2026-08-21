let users = [{ id: 1, name: 'Juan', email: 'juan@test.com' }];

const getAllUsers = (req, res) => res.json(users);

const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getAllUsers, getUserById, createUser };