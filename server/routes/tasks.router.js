const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//const TODOlist = [];
// It's going to be an array because each row more than just a task, right?

// remember url ='/tasks'

router.post('/', (req, res) => {
    // only one input, so this will look a little weird in an array
    const task = req.body.task
    const queryParameters = [task]

    const queryText = `
            INSERT INTO "weekend-to-do-app" ("task")
            VALUES ($1);`;
    pool.query(queryText, [task])
        .then(result => {
            console.log("POST is okay in router")
            res.sendStatus(201);
        })
        .catch(error =>{
            console.log("Error in POST from router")
            res.sendStatus(500)
        })

})

module.exports = router;