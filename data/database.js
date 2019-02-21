const projects = [
    { 
        "project": {
            "title": "Proj 1",
            "deadline": "",
            "team": []
        },
        "author": "John Doe"
    },
    {
        "project": {
            "title": "Proj 2",
            "deadline": "",
            "team": [
                "Blake",
                "Dash"
            ]
        },
        "author": "Paul Logan"
    }
];

const users = [
    {
        id: 'U01',
        username: 'Kwame',
        password: 'qwerty',
        firstname: 'Kwame',
        lastname: 'Kelly',
        email: 'kwame@mail.com',
        acc_type: 'user'
    },
    {
        id: 'A01',
        username: 'Admin',
        password: 'a-qwerty',
        acc_type: 'admin'
    }
];

const admin = [

];

module.exports.projects = projects;
module.exports.users = users;
