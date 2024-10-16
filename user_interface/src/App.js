import React from 'react';
import './App.css';
import MenuAppBar from './components/app-bar';
import Dropzone from './components/image-drag-and-drop-box';

function App() {
  return (
    <div className='App'>
      <MenuAppBar position='static'>
        {/* Ensure the Dropzone is correctly placed within the AppBar */}
        <Dropzone />
      </MenuAppBar>
    </div>
  );
}

export default App;
