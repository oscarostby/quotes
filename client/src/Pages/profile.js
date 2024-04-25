import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const TerminalContainer = styled.div`
  width: 800px;
  height: 500px;
  background-color: #1e1e1e;
  border: 1px solid #333333;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  overflow: hidden;
  margin: 20px auto;
`;

const TerminalHeader = styled.div`
  background-color: #2e2e2e;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: #cccccc;
  flex-grow: 1;
  margin-right: 10%;
`;

const CommandField = styled.textarea`
  background-color: transparent;
  border: none;
  color: #ffffff;
  padding: 0.25rem;
  border-radius: 5px;
  resize: none;
  font-family: 'Menlo', monospace;
  border: none;
  outline: none;
  font-size: 1.2rem;
  width: 790px;
  height: 390px;
`;

const AuthorInput = styled.input`
  background-color: transparent;
  border: none;
  color: #ffffff;
  padding: 0.25rem;
  border-radius: 5px;
  font-family: 'Menlo', monospace;
  border: none;
  outline: none;
  font-size: 1.2rem;
  width: 790px;
  margin-bottom: 0.5rem;
`;

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [user, setUser] = useState('');
  const [isAuthorEntered, setIsAuthorEntered] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleAuthorKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setStatusMessage('Sending username...');
      setTimeout(() => {
        setStatusMessage('Fetching name...');
        setTimeout(() => {
          setStatusMessage('Testing...');
          setTimeout(() => {
            setIsAuthorEntered(true);
            setStatusMessage('');
          }, 1000);
        }, 1000);
      }, 1000);
    }
  };

  const handleCommandKeyDown = async (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      setCommand((prevCommand) => prevCommand + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post('http://10.12.11.203:5000/send-message', {
          message: command,
          author: author.trim(),
          user: user.trim(),
        });
        console.log(response.data.message);
        setCommand('');
        setStatusMessage('Message sent!');
      } catch (error) {
        console.error('Error sending message:', error.response.data.error);
      }
      setLoading(false);
    }
  };
  
  return (
    <TerminalContainer>
      <TerminalHeader>
        <Dot style={{ backgroundColor: '#ff6666', marginRight: '7px' }} />
        <Dot style={{ backgroundColor: '#ffff66', marginRight: '7px' }} />
        <Dot style={{ backgroundColor: '#66ff66', marginRight: '7px' }} />
        <Title>Quote editor</Title>
      </TerminalHeader>
      {!isAuthorEntered ? (
        <AuthorInput
          type="text"
          placeholder="Enter your name or handle"
          value={author}
          onChange={handleAuthorChange}
          onKeyDown={handleAuthorKeyDown}
        />
      ) : (
        <CommandField
          rows={8}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommandKeyDown}
          placeholder={statusMessage === 'Message sent!' ? 'Message sent!' : 'Write your quote here'}
          disabled={loading}
        />
      )}
      <p>{statusMessage}</p>
    </TerminalContainer>
  );
};

export default Terminal;