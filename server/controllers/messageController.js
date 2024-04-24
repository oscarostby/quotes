const Message = require('../models/message');

async function sendMessage(req, res) {
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
}

async function getMessages(req, res) {
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
}

async function updateMessage(req, res) {
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
}

module.exports = {
  sendMessage,
  getMessages,
  updateMessage
};
