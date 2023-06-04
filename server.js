const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const port = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes
app.use('/api/notes', api);

// GET route for index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// GET Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port} 🚀`)
);
