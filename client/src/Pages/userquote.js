import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../compoments/header'; // Corrected typo in import path
import bg from '../pictures/mnfj.webp';
import Terminal from './profile';

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
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.95); /* Lighten the background on hover */
  }
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

const EditablePost = styled.textarea`
  width: calc(100% - 40px);
  height: 100px;
  font-size: 1.2rem;
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0; /* Initially hide the button */
  transition: opacity 0.3s;
  ${PostBox}:hover & {
    opacity: 1; /* Show the button when hovering over PostBox */
  }
`;



const UserQuotes = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.12.11.203:5000/messages');
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

  const handleEdit = async (postId, newText) => {
    try {
      const response = await axios.put(`http://localhost:5000/messages/${postId}`, { message: newText });
      const updatedPost = response.data.updatedMessage;
      setPosts(prevPosts =>
        prevPosts.map(post => (post._id === updatedPost._id ? updatedPost : post))
      );
      console.log('Message successfully updated:', updatedPost);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleTextChange = (postId, newText) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post._id === postId ? { ...post, newText } : post))
    );
  };

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
          {post.editMode ? (
            <>
              <EditablePost defaultValue={post.message} onChange={(e) => handleTextChange(post._id, e.target.value)} />
              <br />
              <button onClick={() => handleEdit(post._id, post.newText)}>Save</button>
              <button onClick={() => setPosts(prevPosts => prevPosts.map(prevPost => prevPost._id === post._id ? { ...prevPost, editMode: false } : prevPost))}>Cancel</button>
            </>
          ) : (
            <>
              <PostText>{post.message}</PostText>
              <AuthorText>- {post.author}</AuthorText>
              {loggedInUsername === username && (
                <EditButton onClick={() => setPosts(prevPosts => prevPosts.map(prevPost => prevPost._id === post._id ? { ...prevPost, editMode: true, newText: post.message } : prevPost))}>Edit</EditButton>
              )}
            </>
          )}
        </PostBox>
      ))}
    </Background>
  );
};

export default UserQuotes;
