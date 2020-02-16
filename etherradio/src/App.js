// This will be our root component
// which will hold the 
// navbar, tip, and music player components
import React from 'react';
import Background from './Background'
import logo from './logo.svg';
import AlbumArt from './AlbumArt'
import './style.css';

function App() {



  return (
    <div className="App">
      <header className="App-header">
          <h1>ETHERRADIO</h1>
			    <ul id="links"><li><a href="#" id="exchange">Exchange</a></li></ul>
          <img src={logo} className="App-logo" alt="logo" />
          <AlbumArt image='./media/vultures.png'/>
      </header>

      <body>
        <Background />
        
      </body>
    </div>
  );
}

export default App;
