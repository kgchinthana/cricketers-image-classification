import React from 'react';
import './App.css';
import MenuAppBar from './components/app-bar';
import Dropzone from './components/image-drag-and-drop-box';
import CardGrid from './components/card-grid';

function App() {
  return (
    <div className="App">
      <MenuAppBar position="static" />
      <div className="content">
        <h1>Image Classifier</h1>
        <CardGrid />
        <Dropzone />
      </div>
    </div>
  );
}

export default App;
