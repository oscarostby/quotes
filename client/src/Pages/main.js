import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Header from "../compoments/header";
import bgImage from "../pictures/bg2.png";
import styled from 'styled-components'; // Import styled-components

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    font-family: 'Roboto', sans-serif;
    color: #333;
  }
`;

const QuoteBox = styled.div`
  position: relative;
  width: 60%;
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: -20vh; /* Adjust this value to move the quote box further up */
`;

const QuoteContent = styled.p`
  font-style: italic;
  font-size: 1.6rem;
  margin-bottom: 20px;
  text-align: center;
`;

const AuthorName = styled.p`
  font-size: 1.2rem;
  text-align: right;
  font-weight: bold;
  color: #555;
`;

const LeftBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #333;
`;

const QuoteMark = styled.span`
  position: absolute;
  top: -15px;
  left: 20px;
  font-size: 3rem;
  color: #333;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const App = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://10.12.11.203:5000/messages');
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
      <GlobalStyle />
      <Header />
      <Container>
        {message && (
          <QuoteBox>
            <LeftBorder />
            <QuoteMark>“</QuoteMark>
            <QuoteContent>{message.message}</QuoteContent>
            <AuthorName>- {message.author}</AuthorName>
          </QuoteBox>
        )}
      </Container>
    </>
  );
};

export default App;
