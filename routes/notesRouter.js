const express = require('express');
const notesRouter = express.Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtil.js');
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

//DELETE Route for a specific note
notesRouter.delete('/', (req,res) =>{
    const notesId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            //Creates a new array of all the notes except for the one with the specific ID that was chosen
            const result = json.filter((note) => note.id !== notesId);
            //Saves the array to the file system
            writeToFile('./db/db.json', result);
            //Responds in the console that item was DELETED
            res.json(`Item ${notesId} has been deleted.`);
        });
})

module.exports = notesRouter;