const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/users/:username', userController.deleteUser);

// Message routes
router.post('/send-message', messageController.sendMessage);
router.get('/messages', messageController.getMessages);
router.put('/messages/:id', messageController.updateMessage);

router.post('/send', messageController.sendMessage);

module.exports = router;
