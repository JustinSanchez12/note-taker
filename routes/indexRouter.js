const express = require('express');
const router = express.Router();
const {readFromFile} = require('../helpers/fsUtil.js');

//TODO: GET route to return to index.html
router.get('*', (req,res) =>{
    readFromFile('./public/index.html').then((data) => res.json(JSON.parse(data)));
})

//Export Modular
module.exports = router;