import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/main';
import Login from "./Pages/login"
import Editor from "./Pages/profile"
import UserQuotes from "./Pages/userquote" // Import the new component
import Help from "./Pages/help"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/help" element={<Help />} />
        <Route path="/:username" element={<UserQuotes />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
