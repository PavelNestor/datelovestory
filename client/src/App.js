import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState({ apiResponse: '' })

  useEffect(() => {
    fetch("http://192.168.99.100:4000/testDB")
        .then(res => res.text())
        .then(res => setState({ apiResponse: res }));
  }, []);

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
      </header>
      <p className="App-intro">{ state.apiResponse }</p>
    </div>
  );
}

export default App;
