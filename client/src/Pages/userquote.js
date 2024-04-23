import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../compoments/header';
import bg from './bg.png';
import Terminal from './profile'; // Import Terminal component

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  min-height: 100vh;
`;

const PostBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  position: relative;
`;

const PostText = styled.div`
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        const filteredPosts = response.data.messages.filter(post => post.user === username);
        setPosts(filteredPosts);

        const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
        const usernameFromStorage = localStorage.getItem('username');

        if (isLoggedInFromStorage === 'true' && usernameFromStorage === username) {
          setLoggedInUsername(usernameFromStorage);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Background>
      <Header />
      {loggedInUsername === username && <Terminal />}
      <br />
      {posts.map((post, index) => (
        <PostBox key={index}>
          <PostText>{post.message}</PostText>
          <AuthorText>- {post.author}</AuthorText>
        </PostBox>
      ))}
    </Background>
  );
};

export default UserQuotes;
