import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api', { message: prompt });
      setOutput(response.data);
    } catch (error) {
      console.error('Error fetching response:', error);
      setOutput('Failed to fetch response');
    }
  };

  return (
    <div>
      <h1>Chat with GPT-3.5</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default Home;
