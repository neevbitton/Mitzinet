//Neev bitton 318504164 & Orel dadon 313278061
const express = require('express');
const mongojs = require("mongojs");
const bcrypt = require('bcrypt');

//If you use the shared mongodb server:
const db = mongojs(
    'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024',
    ['mitzinet_<neev_orel>']
);

//Edit this line to point to your specific collection!
const mitzinet__coll = db.collection('mitzinet_<neev_orel>');

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Serve static files from the 'static' directory
app.use(express.static('static'));

app.post('/register', (req, res) => {
    const {
        fname,
        lname,
        telephone,
        email,
        password,
        confirmPassword
    } = req.body;

    //validation checks
    console.log(req.body);
    if (!fname || !lname || !telephone || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields must be complete');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid email");
    }

    if (password.length < 8) {
        return res.status(400).send("The password must contain 8 characters");
    }

    if (password !== confirmPassword) {
        return res.status(400).send('The passwords are not equals');
    }




    //hash the password

    const hashedPassword = bcrypt.hash(password, 10);

    //create new user
    const user = {
        fname,
        lname,
        telephone,
        email,
        password: hashedPassword

    };

    //insert new user 
    mitzinet__coll.insert(user, (err, doc) => {
        if (err) {
            return res.status(500).json({
                error: 'Server error'
            });
        } else {
            res.status(200).json(doc);
        }


    });
});


//check if email exist
app.get('/check-email', (req, res) => {
    const email = req.query.email;
    mitzinet__coll.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                error: 'wrong check'
            });
        }

        if (user) {
            res.status(200).json({
                exists: true
            });
        } else {
            res.status(200).json({
                exists: false
            });
        }
    });
});


//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});