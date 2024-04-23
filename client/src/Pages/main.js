import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from "../compoments/header"; // Corrected typo in "components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FancyBox = styled.div`
  position: relative;
  width: 700px;
  height: 390px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid black;
  clip-path: polygon(0 0, 91% 0, 100% 12%, 100% 100%, 12% 100%, 0 89%);
`;

const MessageContent = styled.p`
  font-style: italic;
  font-size: 1.2rem;
  margin: 0;
`;

const AuthorName = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 0.8rem;
  margin: 0;
`;

const App = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        const randomIndex = Math.floor(Math.random() * response.data.messages.length);
        setMessage(response.data.messages[randomIndex]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {message && (
          <FancyBox>
            <MessageContent>{message.message}</MessageContent>
            <AuthorName>Author: {message.author}</AuthorName>
          </FancyBox>
        )}
      </Container>
    </>
  );
};

export default App;
