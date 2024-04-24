const axios = require('axios');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
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
};

exports.getMessages = async (req, res) => {
  try {
    const { user } = req.query;
    const query = user ? { user } : {};
    const response = await axios.get('/message', { params: query });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
};