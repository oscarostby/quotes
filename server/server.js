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

// Modify the message schema to include a 'user' field
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  user: { type: String, required: true }, // Add this line
});

const Message = mongoose.model('Message', messageSchema);

// Modify the '/send-message' endpoint to save the 'user'
app.post('/send-message', async (req, res) => {
  const { message, author, user } = req.body; // Add 'user' here
  try {
    const newMessage = new Message({ message, author, user }); // And here
    await newMessage.save();
    console.log('Message successfully saved');
    res.status(200).json({ message: 'Message successfully sent' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
});


// Add a new route to fetch quotes by username
// Add a new route to fetch quotes by username
app.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const quotes = await Message.find({ user: username }).exec();
    res.status(200).json({ quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'An error occurred while fetching quotes' });
  }
});


// Modify the '/send-message' endpoint to fetch and log all messages
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




app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    const messages = await Message.find().exec();
    console.log("All Messages:");
    messages.forEach(message => {
      console.log(`Message: ${message.message}, Author: ${message.author}, User: ${message.user}`);
    });
  } catch (error) {
    console.error('Error fetching and logging messages:', error);
  }
});

