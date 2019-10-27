import React, { useEffect, useState } from 'react';
import Routes from './routes';

import './App.css';

const App = () => {
  const [state, setState] = useState({ apiResponse: '' });

  useEffect(() => {
    fetch("http://localhost:4000/testDB")
        .then(res => res.text())
        .then(res => setState({ apiResponse: res }));
  }, []);

  return (
    <Routes />
  );
};

export default App;
