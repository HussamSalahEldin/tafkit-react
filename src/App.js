import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setNumber(value);
      if (value !== '') {
        try {
          const response = await fetch(`https://l6w9lyhl2d.execute-api.us-east-1.amazonaws.com/prod/tafkit?number=${value}`)
          // read the response body as text
          const body = await response.text();
          console.log(body)
          setResponse(body);
          setError(null);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch data');
          setResponse(null);
        }
      } else {
        setResponse(null);
        setError(null);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Input</h1>
        <input
          type="text"
          value={number}
          onChange={handleChange}
          placeholder="Enter a number"
        />
        {error && <p className="error">{error}</p>}
        {response && (
          <div className="response">
            <h2>الرقم:</h2>
            <h1>{response}</h1>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
