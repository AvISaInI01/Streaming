import React from 'react';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 Mini Netflix Player</h1>
      <video
        width="720"
        controls
        src="http://192.168.1.7:3000/video"
        style={{ borderRadius: '8px', marginTop: '1rem' }}
        />
    </div>
  );
}

export default App;
