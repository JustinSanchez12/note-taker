const express = require('express');
const notesRouter = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsUtil.js');
const { v4: uuidv4 } = require('uuid');

//GET the route for the db.json file, this is where the notes will be read
notesRouter.get('/', (req,res) =>{
    console.info(`${req.method} request has been received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//POST routes for db.json file, this is where the notes will be posted and if it done correctly it will display a success message otherwise it will send an error message
notesRouter.post('/', (req,res) =>{
    const {title, text} = req.body;

    if(title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4()
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