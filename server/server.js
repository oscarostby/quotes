const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectionString = 'mongodb+srv://admin:admin@exampremcluster.sbjc7bi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
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
});

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  user: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);

app.post('/send-message', async (req, res) => {
  const { message, author, user } = req.body;
  try {
    const newMessage = new Message({ message, author, user });
    await newMessage.save();
    console.log('Message successfully saved');
    res.status(200).json({ message: 'Message successfully sent' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().exec();
    console.log("All Messages:");
    messages.forEach(message => {
      console.log(`Message: ${message.message}, Author: ${message.author}, User: ${message.user}`);
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    const populatedUsers = await Promise.all(users.map(async (user) => {
      const userData = user.toObject();
      const messages = await Message.find({ user: user.username }).exec();
      userData.messages = messages;
      return userData;
    }));
    res.status(200).json({ users: populatedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const { user } = req.query;
    const query = user ? { user } : {}; // If user is provided in the query, filter by user
    const messages = await Message.find(query).exec();
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});

app.delete('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await User.findOneAndDelete({ username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

app.put('/messages/:id', async (req, res) => {
  const messageId = req.params.id;
  const { message } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { message }, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    console.log('Message successfully updated:', updatedMessage);
    res.status(200).json({ updatedMessage }); // Send back the updated message
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'An error occurred while updating the message' });
  }
});


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
