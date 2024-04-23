import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './logo.png'; // Import the logo image

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #ccc;
  font-family: 'Arial', sans-serif;
`;

const LogoImage = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
  text-align: center; /* Center the text */
`;

const Button = styled.button`
  text-decoration: none;
  padding: 10px 20px;
  background-color: ${props => (props.primary ? '#007bff' : '#dc3545')};
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.primary ? '#0056b3' : '#c82333')};
  }
`;

const Header = () => {
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='));
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
    const usernameFromStorage = localStorage.getItem('username');

    if (usernameCookie) {
      const username = usernameCookie.split('=')[1];
      setLoggedInUsername(username);
    } else if (isLoggedInFromStorage === 'true' && usernameFromStorage) {
      setLoggedInUsername(usernameFromStorage);
    }
  }, []);

  const isLoggedIn = !!loggedInUsername;

  const handleLogout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setLoggedInUsername('');
  };

  return (
    <>
      <HeaderContainer>
        <LogoImage src={Logo} alt="Logo" />
        <Title>{isLoggedIn ? `Quote - ${loggedInUsername}` : 'Quote'}</Title>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button primary>Login</Button>
          </Link>
        )}
      </HeaderContainer>
      <Separator />
    </>
  );
};

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
`;

export default Header;
