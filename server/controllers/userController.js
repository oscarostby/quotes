const bcrypt = require('bcrypt');
const User = require('../models/user');

async function registerUser(req, res) {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}

async function deleteUser(req, res) {
  const { username } = req.params;
  try {
    await User.findOneAndDelete({ username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  deleteUser
};
