import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #ccc; /* Add a bottom border */
  font-family: 'Arial', sans-serif; /* Change font to a more stylish one */
`;

const Logo = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  margin: 0;
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = ({ username }) => {
  return (
    <>
      <HeaderContainer>
        <Logo src="/path/to/Logo.png" alt="Logo" />
        <Title>Quotes - {username}</Title>
        <LoginButton to="/login">Login</LoginButton>
      </HeaderContainer>
      <Separator /> {/* Add a separator component */}
    </>
  );
};

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ccc; /* Change border-top to 1px */
`;

export default Header;

// In a new file, let's say ../pages/HomePage.js