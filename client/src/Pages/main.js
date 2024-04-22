import React from 'react';
import styled from 'styled-components';
import Header from '../compoments/header'; // Adjust the path if necessary

const HomePage = () => {
  return (
    <Wrapper>
      <Header username="YourUsername" />
      <QuoteBox>
        <QuoteContent>
          <QuoteText>
            Google is a multinational technology company specializing in Internet-related services and products.
          </QuoteText>
          <QuoteText>
            Founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University.
          </QuoteText>
          <QuoteText>
            Google's mission is to organize the world's information and make it universally accessible and useful.
          </QuoteText>
        </QuoteContent>
        <Author>Author: <Cursive>Google</Cursive></Author>
      </QuoteBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* Any styles for the wrapper */
`;

const QuoteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 70%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  margin-top: 50px;
`;

const QuoteContent = styled.div`
  text-align: center;
`;

const QuoteText = styled.p`
  margin-bottom: 15px;
  font-family: 'Satisfy', cursive;
  font-size: 1.2em;
  padding-left: 20px; /* Move text 20px to the right */
`;

const Author = styled.p`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Cursive = styled.span`
  font-family: cursive;
`;

export default HomePage;
