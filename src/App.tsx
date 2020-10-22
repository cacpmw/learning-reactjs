import React from 'react';
import Header from './components/Header'
import { Routes } from './routes'
import './styles/global.css'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes />
    </div>
  );
}

export default App;
