const express = require('express');
const notesRouter = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsUtil.js');


notesRouter.get('/api/notes', (req,res) =>{
    console.info(`${req.method} request has been received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notesRouter.post('/api/notes', (req,res) =>{
    const {title, text} = req.body;

    if(title && text) {
        const newNotes = {
            title,
            text
        };

        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes
        };

        res.json(response);
    } else {
        res.status(400).json('Error in posting notes');
    }
})

module.exports = notesRouter;