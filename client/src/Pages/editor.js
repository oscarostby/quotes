import React from 'react';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
  padding: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const DollarSign = styled.span`
  margin-right: 0.5rem;
`;

const Input = styled.input`
  background-color: #333333;
  border: none;
  color: #ffffff;
  padding: 0.25rem;
`;

const Terminal = () => {
  return (
    <TerminalContainer>
      <Title>Quote editor</Title>
      <Prompt>
        <DollarSign>$</DollarSign>
        <Input type="text" placeholder="Write your command here" />
      </Prompt>
    </TerminalContainer>
  );
};

export default Terminal;