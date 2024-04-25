import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/messages/"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    api.get("/")
      .then(res => {
        console.log("Data received from API:", res.data);
        if (res.data && res.data.messages && Array.isArray(res.data.messages)) {
          // If data is an object with a 'messages' property containing the array
          this.setState({ courses: res.data.messages, loading: false });
        } else {
          throw new Error("Unable to extract messages from data");
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ error: error.message, loading: false });
      });
  }
  
  

  render() {
    const { courses, loading, error } = this.state;
    return (
      <div>
        <h1>Messages</h1>
        <ul>
          {courses.map(course => (
            <li key={course._id}>{course.message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
