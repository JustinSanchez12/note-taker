const express = require('express');
const {readFromFile} = require('../helpers/fsUtil.js');
const router = express.Router();

//TODO: GET route for notes.html
// Transforms data from notes.html to JSON File
router.get('/notes', (req,res) =>{
    readFromFile('./public/notes.html').then((data) => res.json(JSON.parse(data)));
})

//Export Modular
module.exports = router;