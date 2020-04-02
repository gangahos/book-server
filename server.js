//Reference:https://github.com/hunterjorgensen167/webdev_fullstack
const express = require('express');
const toread = require('./toread.js');
const haveread = require('./haveread.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

conf = {
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || 3001,

    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {

        if (!req.headers.origin) {

            res.json({

                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'

            });

        } else {

            next();

        }

    },

    // Cross Origin Resource Sharing Options
    cors: {

        // origin handler
        origin: function (origin, cb) {

            // setup a white list
            let wl = ['https://book-server-2020.herokuapp.com/'];

            if (wl.indexOf(origin) != -1) {

                cb(null, true);

            } else {

                cb(new Error('invalid origin: ' + origin), false);

            }

        },

        optionsSuccessStatus: 200

    }

};
app.use(conf.originUndefined, cors(conf.cors));

app.use('/api/toread', toread);

app.use('/api/haveread', haveread);

app.listen(3001, function() {
    console.log('Starting server');
});