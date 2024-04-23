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
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
  text-align: center; /* Center the text */
`;

const Button = styled.button`
  text-decoration: none;
  padding: 10px 20px;
  background-color: white;
  color: white;
  border: 2px solid black;
  cursor: pointer;
  background-color: black;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border: 2px solid black;
    color: black;
    background-color: rgba(255, 255, 255, 0 );
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
        {/* Wrap the LogoImage in Link component */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <LogoImage src={Logo} alt="Logo" />
        </Link>
        {/* Wrap the title in Link component */}
        <Link to={`/${loggedInUsername}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title>{isLoggedIn ? `Quote - ${loggedInUsername}` : 'Quote'}</Title>
        </Link>
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
