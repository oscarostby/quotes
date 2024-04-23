import Terminal from './profile'; // Import Terminal component
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'; // Import styled-components
import Header from '../compoments/header'; // Adjust the path if necessary
import bg from './bg.png'; // Import the background image

const Background = styled.div`
  background-image: url(${bg}); /* Using imported image */
  background-size: cover;
  min-height: 100vh; /* Ensure the background covers the entire viewport height */
`;

const QuoteBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  position: relative;
`;

const QuoteText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const AuthorText = styled.div`
  font-size: 1rem;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const UserQuotes = () => {
  const { username } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserQuotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${username}`);setQuotes(response.data.quotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user quotes:', error);
        setLoading(false);
      }
    };

    fetchUserQuotes();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the Terminal component only if the username is 'sadasd'
  const shouldRenderTerminal = username === 'sadasd';

  return (
    <Background>
      <Header />
      <br />
      {shouldRenderTerminal && <Terminal />}
      <br />
      {quotes.map((quote, index) => (
        <QuoteBox key={index}>
          <QuoteText>{quote.message}</QuoteText>
          <AuthorText>- {quote.author}</AuthorText>
        </QuoteBox>
      ))}
    </Background>
  );
};

const UserQuotesWithTerminal = () => (
  <UserQuotes />
);

export default UserQuotesWithTerminal;