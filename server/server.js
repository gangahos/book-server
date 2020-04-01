//Reference:https://github.com/hunterjorgensen167/webdev_fullstack
const express = require('express');
const toread = require('./toread.js');
const haveread = require('./haveread.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/toread', toread);

app.use('/api/haveread', haveread);

app.listen(3001, function() {
    console.log('Starting server');
});