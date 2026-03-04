const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// CSS test route
app.get('/css-test.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'css-test.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DICTOLE Server Running!`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://0.0.0.0:${PORT}`);
  console.log(`\n📄 Available Pages:`);
  console.log(`   http://localhost:${PORT}/ - Main Site`);
  console.log(`   http://localhost:${PORT}/css-test.html - CSS Test`);
  console.log(`\n✨ Server is ready! Open your browser and visit the URLs above.`);
});
