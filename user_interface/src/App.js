import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import MenuAppBar from './components/app-bar';

function App() {
  return (
    <div className="App">
      <MenuAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
        </Toolbar>
      </MenuAppBar>
    </div>
  );
}

export default App;
