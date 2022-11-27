const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const unless = require('express-unless');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const auth = require('./middleware/auth');
const errors = require('./middleware/errors');

const app = express();

app.use(bodyParser.json());

const postRoute = require('./routes/post');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

//app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/posts', postsRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.send('Home Page');
});

mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] }
        ],
    })
);

app.use(errors.errorHandler);
app.use(express.json());

module.exports = app;

/*app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});*/
