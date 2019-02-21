const database = require('../data/database');
const localStorage = require('localStorage');

// // token verification 

// function verifyToken(req, res, next) {
//     // auth token header value
//     const bearerToken = req.headers['authorization']
//     if (typeof (bearerToken) !== 'undefined') {
//         // token extraction from header
//         const token = bearerToken.split(' ')[1];

//         req.token = bearerToken;
//         next();
//     } else res.sendStatus(403);
// }


// account validation
function accTypeVerification( req, res, next ) {
    if ( req.body.user.acc_type == 'user' ) res.sendStatus(403); 
    else next();
}


// login authentication

function loginAuth(req, res, next) {
    const users = database.users;
    // check database for matching user
    for ( let x = 0; x < users.length ; x++ ) {
        if ( 
            users[x].username === req.body.username && 
            users[x].password === req.body.password   
        ) {
            // store certain user info in localStorage
            const user = {
                name: users[x].firstname,
                email: users[x].email,
                acc_type: users[x].acc_type 
            };

            const userDetails = JSON.stringify(user);
            localStorage.setItem('userDetails', userDetails);
            next();
            return;
        }
    }
    res.sendStatus(403);
}


// clear local storage and call next

function logout(req, res, next) {
    localStorage.clear();
    next();
}




const exp = module.exports

// exp.verifyToken = verifyToken;
exp.loginAuth = loginAuth;
exp.accTypeVerification = accTypeVerification;
exp.logout = logout;