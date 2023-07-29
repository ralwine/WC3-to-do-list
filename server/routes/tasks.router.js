const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

const TODOlist = [];
// It's going to be an array because each row more than just a task, right?

// remember url ='/tasks'
router.get('/', (req, res)=>{
    const queryText = `
        SELECT * FROM "todos";`;
    
    pool.query(queryText)
        .then((result) =>{
            console.log("GET is okay in router", result)
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log("Error in GET from router", error)
            res.sendStatus(500)
        })

})

router.post('/', (req, res) => {
    // only one input, so this will look a little weird in an array
    const task = req.body
    const queryParameters = [task]

    const queryText = `
            INSERT INTO "todos" ("task")
            VALUES ($1);`;
    pool.query(queryText, [task])
        .then(result => {
            console.log("POST is okay in router", task)
            res.sendStatus(201);
        })
        .catch((error) =>{
            console.log("Error in POST from router", error)
            res.sendStatus(500)
        })

})

module.exports = router;