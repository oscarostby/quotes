import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../compoments/header'; // Importing the Header component

const HelpContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Instruction = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Highlight = styled.span`
  font-weight: bold;
`;

const Help = () => {
  return (
    <>
      <Header /> {/* Adding the Header component */}
      <HelpContainer>
        <h1>Need Help?</h1>

        <SectionTitle>1. Register and Login</SectionTitle>
        <Instruction>
          To register for an account and login, visit the <StyledLink to="/login">Login page</StyledLink>.
        </Instruction>

        <SectionTitle>2. Make a Post</SectionTitle>
        <Instruction>
          After logging in, navigate to the <StyledLink to="/editor">Editor page</StyledLink> or go to your profile to create a new post.
        </Instruction>

        <SectionTitle>3. Edit a Post</SectionTitle>
        <Instruction>
          To edit a post you've made, simply go to the post and click the "Edit" button.
        </Instruction>

        <SectionTitle>4. Visit Your Own Page</SectionTitle>
        <Instruction>
          You can view your own profile page by clicking the <Highlight>"Quote - Your Username"</Highlight> button and typing <Highlight>/yourusername</Highlight> in the URL.
        </Instruction>

        <SectionTitle>5. Visit Other People's Pages</SectionTitle>
        <Instruction>
          To view another user's profile, replace <Highlight>:username</Highlight> in the URL with their username. For example, <StyledLink to="/otherusername">/otherusername</StyledLink>.
        </Instruction>
      </HelpContainer>
    </>
  );
};

export default Help;
