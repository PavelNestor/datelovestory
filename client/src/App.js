import React, { useEffect, useState } from 'react';
import Routes from './routes';

import './App.css';

const App = () => {
  const [state, setState] = useState({ apiResponse: '' });

  const URL = 'http://192.168.99.100:4000/'; // windows
  // const URL = 'http://localhost:4000/'; // ubuntu

  useEffect(() => {
    fetch(`${URL}/testDB`)
        .then(res => res.text())
        .then(res => setState({ apiResponse: res }));
  }, []);

  return (
    <Routes />
  );
};

export default App;
