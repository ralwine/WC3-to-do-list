const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').conifg();
const router = require('./routes/tasks.router');

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));


app.use('/tasks', router);

const PORT = process.env.PORT || 5000;
// Start express

app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});