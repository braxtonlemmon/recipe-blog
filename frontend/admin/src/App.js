import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const callAPI = () => {
    fetch('http://localhost:9000/recipes')
    .then(res => res.text())
    .then(res => setApiResponse(res))
  }

  useEffect(() => {
    callAPI();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{apiResponse}</p>
        <p>hey</p>
      </header>
    </div>
  );
}

export default App;
