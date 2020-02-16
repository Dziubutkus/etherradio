// This will be our root component
// which will hold the 
// navbar, tip, and music player components
import React from 'react';
import Background from './Background'
import logo from './logo.svg';
import AlbumArt from './AlbumArt'
import './style.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function App() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
          <h1>ETHERRADIO</h1>
			    <ul id="links"><li><a href="#" id="exchange">Exchange</a></li></ul>
          
      </header>
      
      <body>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <AlbumArt image='./media/vultures.png'/>
            <Background />
          </Grid>
        </Grid>
      </Grid>
      </body>
    </div>
  );
}

export default App;
