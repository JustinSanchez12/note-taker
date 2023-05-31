// Variables that are needed for application

const express = require('express');
const path  = require('path');
const notesData = require('./db/db.json');
const fs = require('fs');
const util = require('util');


// Route variables created
const notesRouter = require('./routes/notesRouter.js');
const indexRouter = require('./routes/indexRouter');
const dbRouter = require('./routes/dbRouter.js');

const port = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route for index.html
app.get('*', (req,res) => 
    res.sendFile(path.json(__dirname, '/public/index.html'))
);

// GET Route for notes.html
app.get('/notes', (req,res)=>
    res.sendFile(path.json(__dirname, '/public/notes.html'))
);

// Loads the dbRouter module to the server
app.use('/api/notes', dbRouter);

app.listen(port, () =>
    console.log(`App is listening at http://localhost:${port} 🚀`)
);