const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const database = require('./data/database');
const functions = require('./functions/functions');
const localStorage = require('localStorage');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// get project details
app.get('/projects', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'projects recieved',
        projects: database.projects
    });
});

app.post('/login', functions.loginAuth, (req, res) => {

    // sample request
    // {
    //     "id": "U01",
    //     "username": "Kwame",
    //     "password": "qwerty",
    //     "firstname": "Kwame",
    //     "lastname": "Kelly",
    //     "email": "kwame@mail.com",
    //     "acc_type": "user"
    // }

    jwt.sign({user: database.users}, 'secret', (err, token) => {
        res.json({
            token: token,
            user: JSON.parse(localStorage.getItem('userDetails'))
        })
    });
});

app.get('/logout', functions.logout, (req, res) => {
    // 
});

app.post('/register', (req, res) => {
    // sample post request
    // {
    //     "firstname": "John",
    //     "lastname": "Doe",
    //     "email": "johndoe@mail.com",
    //     "password": "xxxxxxx",
    //     "username": "j_doe",
    //     "acc_type": "user"
    // }

    database.users.push(req.body);

    res.json({
        success: true,
        message: 'Successfully Registered User',
        user: req.body
    });
});

app.post('/add-project', functions.accTypeVerification, (req, res) => {
    // Sample request payload
    // -----------------------
    // user be logged in first

    //  { 
    //      "project": {
    //          "title": '',
    //          "deadline": '',
    //          "team": []
    //      },
    //      "user": JSON.parse(localStorage.getItem('userData'))
    //  }

    if ( typeof(localStorage.getItem('userDetails')) === null ) res.sendStatus(403);
    else {
        // add project to database
        database.projects.push(req.body);

        res.json({
            success: true,
            message: 'Project Successfully added',
            timestamp: new Date().getTime(),
            author: JSON.parse(localStorage.getItem('userDetails')).name,
        });
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});