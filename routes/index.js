const express = require('express');

//Import modular routers for /api/notes
const notesRouter = require('./notesRouter');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;