const express = require('express');
const app = express();
const port = 8080;

// Basic routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

// Route with HTML response
app.get('/html', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Express Routing</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #0066cc; }
          p { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>HTML Response from Express</h1>
        <p>This response was sent using Express routing.</p>
        <p>Try other routes: <a href="/">/</a> | <a href="/about">/about</a> | <a href="/contact">/contact</a></p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

              