const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

const TODOlist = [];
// It's going to be an array because each row more than just a task, right?

// remember url ='/tasks'
router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "todos";`;

    pool.query(queryText)
        .then((result) => {
            console.log("GET is okay in router", result)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("Error in GET from router", error)
            res.sendStatus(500)
        })

})

router.post('/', (req, res) => {
    // only one input, so this will look a little weird in an array
    const task = [req.body.name, req.body.complete]
    //const queryParameters = task

    const queryText = `
            INSERT INTO "todos" ("task", "complete")
            VALUES ($1, $2);`;
    pool.query(queryText, task)
        .then(result => {
            console.log("POST is okay in router", task)
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log("Error in POST from router", error)
            res.sendStatus(500)
        })

})

router.delete('/deletetasks/:id', (req, res) => {
    // hopefully this is all params
    let taskToDeleteID = req.params.id
    let queryText = 'DELETE FROM "todos" WHERE id=$1;'

    pool.query(queryText, [taskToDeleteID])
        .then((result) => {
            console.log("DELETE is okay in router", taskToDeleteID)
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log("Error making DB query: ", queryText)
            console.log("Error in DELETE from router", error)
            res.sendStatus(500)
        })
})

module.exports = router;