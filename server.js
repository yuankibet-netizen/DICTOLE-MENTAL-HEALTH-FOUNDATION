const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const url = require('url');
require('dotenv').config();

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // JSON send-email endpoint (newsletter, appointment, contact, dispute)
  const isSendEmail = (req.url === '/api/send-email') && req.method === 'POST';
  if (isSendEmail) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your-app-password') {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email not configured. Add your Gmail app password to .env' }));
          return;
        }
        const data = JSON.parse(body);
        const { name, email, formType = 'contact' } = data;
        let subject, html;

        if (formType === 'newsletter') {
          if (!email) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Email is required' }));
            return;
          }
          subject = 'Newsletter Signup';
          html = `<h2>New Newsletter Subscription</h2><p><strong>Email:</strong> ${String(email).replace(/[<>"']/g, '')}</p>`;
        } else if (formType === 'appointment') {
          if (!name || !email) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Name and email are required' }));
            return;
          }
          const { phone, service, date, time, message } = data;
          subject = `Appointment Request from ${name}`;
          html = `
            <h2>Appointment Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Preferred Date:</strong> ${date || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${time || 'Not specified'}</p>
            <p><strong>Additional Notes:</strong></p>
            <p>${message ? String(message).replace(/\n/g, '<br>') : 'None'}</p>
          `;
        } else if (formType === 'dispute') {
          const { orderId, dispute } = data;
          if (!dispute) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Please describe your dispute' }));
            return;
          }
          subject = `Dispute Submission from ${name}`;
          html = `
            <h2>Dispute Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Order/Service ID:</strong> ${orderId || 'Not provided'}</p>
            <p><strong>Dispute Details:</strong></p>
            <p>${String(dispute).replace(/\n/g, '<br>')}</p>
          `;
        } else {
          const { message } = data;
          if (!name || !email || !message) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Name, email, and message are required' }));
            return;
          }
          subject = `Contact from ${name}`;
          html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${String(message).replace(/\n/g, '<br>')}</p>
          `;
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'dictolementalhealthfoundation@gmail.com',
          subject,
          html
        }, (err, info) => {
          if (err) {
            console.error('Email error:', err);
            let msg = 'Failed to send message.';
            if (err.code === 'EAUTH' || err.message?.includes('Invalid login')) {
              msg = 'Gmail login failed. Use an App Password in .env';
            }
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: msg }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Message sent successfully' }));
          }
        });
      } catch (err) {
        console.error('Send-email handler error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message || 'Failed to send message' }));
      }
    });
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  let contentType = 'text/html';

  switch (ext) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
