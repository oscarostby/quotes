import React from 'react';
import styled from 'styled-components';
import background from './background.png';

const TerminalContainer = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #000000;
  padding: 0.5rem;
  border-radius: 5px;
`;

const DollarSign = styled.span`
  margin-right: 0.5rem;
  color: #ffffff;
`;

const Input = styled.input`
  background-color: transparent;
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

export default Terminal;import React from 'react';
import styled from 'styled-components';
import background from './background.png';

const TerminalContainer = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #000000;
  padding: 0.5rem;
  border-radius: 5px;
`;

const DollarSign = styled.span`
  margin-right: 0.5rem;
  color: #ffffff;
`;

const Input = styled.input`
  background-color: transparent;
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