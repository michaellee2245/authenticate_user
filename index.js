const express = require ('express');
const bodyParser = require ('body-parser');
const massive = require ('massive');
const session = require ('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const app = express();

massive('postgres://mcygapkgxexgsf:c25376ed889acae717f0de519150b5ce2fc10004bd7e806626ad2f566934f826@ec2-54-225-115-234.compute-1.amazonaws.com:5432/d826nj9i53fdjd?ssl=true')
    .then((database) => {
        app.set('db', database)
        console.log('Database connected')
    })
    .catch((error) => console.error('error', error));


app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const db = req.app.get('db');
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if(err){
            return res.send('An error occurred while hashing.')
        }
        db.create_user([req.body.email, hash])
        .then(() => {
            res.status(200).send('User created successfully.')
        })
        .catch((error) => {
            res.status(500).send(error)
        })
    })
})



app.listen(4000, () => {
    console.log('Server is listening on Port 4000')
})