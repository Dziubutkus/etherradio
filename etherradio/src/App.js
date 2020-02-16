// This will be our root component
// which will hold the 
// navbar, tip, and music player components
import React from 'react';
import logo from './logo.svg';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <p>background here</p>
      </body>
    </div>
  );
}

export default App;
