import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:5000/users/${username}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${messageId}`);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username}{' '}
            <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Messages:</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            {message.message} by {message.author}{' '}
            <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
