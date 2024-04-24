import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../pictures/logo.png'; // Import the logo image

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Adjusted padding */
  font-family: 'Arial', sans-serif;
  height: 80px; /* Adjusted height */
`;

const LogoImage = styled.img`
  width: 150px; /* Reduced width */
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const TitleWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px; /* Adjusted font size */
`;

const Button = styled.button`
  text-decoration: none;
  padding: 8px 16px; /* Adjusted padding */
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
        <TitleWrapper>
          <Link to={`/${loggedInUsername}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title>{isLoggedIn ? `Quote - ${loggedInUsername}` : 'Quote'}</Title>
          </Link>
        </TitleWrapper>
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
