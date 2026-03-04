const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve the main index.html
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
    // Serve the CSS test page
    fs.readFile(path.join(__dirname, 'css-test.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading css-test.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    // Serve CSS files
    const cssPath = path.join(__dirname, req.url.slice(1));
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('CSS file not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Available pages:');
  console.log('  http://localhost:8000/ - Main site');
  console.log('  http://localhost:8000/css-test.html - CSS test page');
});
