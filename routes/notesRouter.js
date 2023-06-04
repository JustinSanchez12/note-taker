const express = require('express');
const notesRouter = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsUtil.js');


//TODO: Routes for GET api/notes should read db.json
notesRouter.get('/api/notes', (req,res) =>{
    console.info(`${req.method} request has been received`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
})


//TODO: Routes for POST api/notes
/* TODO: hould receive a new note to save on the request body, add it to the db.json file, 
 and then return the new note to the client. You'll need to find a way to give each note a unique
  id when it's saved (look into npm packages that could do this for you).*/

notesRouter.post('/api/notes', (req,res) =>{
    const {title, text} = req.body;

    if(title && text) {
        const newNotes = {
            title,
            text
        };

        readAndAppend(newNotes, '../db/db.json');

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