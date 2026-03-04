const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle different routes
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/css-test.html') {
    fs.readFile(path.join(__dirname, 'css-test.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading css-test.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('CSS file not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else {
    // Try to serve static files
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      // Determine content type
      const ext = path.extname(filePath);
      let contentType = 'text/plain';
      if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.html') contentType = 'text/html';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.png') contentType = 'image/png';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 DICTOLE Server Running!');
  console.log('📍 Local: http://localhost:' + PORT);
  console.log('📍 Network: http://0.0.0.0:' + PORT);
  console.log('\\n📄 Available Pages:');
  console.log('   http://localhost:' + PORT + '/ - Main Site');
  console.log('   http://localhost:' + PORT + '/css-test.html - CSS Test');
  console.log('\\n✨ Server is ready! Open your browser and visit the URLs above.');
});
