import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HelpButton = styled(Link)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  color: #333333;
  border: 2px solid #333333;
  border-radius: 5px;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
`;

const Help = () => {
  return (
    <HelpButton to="/help">
      Help
    </HelpButton>
  );
};

export default Help;
