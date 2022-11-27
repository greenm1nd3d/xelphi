const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

async function login({ email, password }, callback) {
    const user = await User.findOne({ email });

    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(email);
            return callback(null, {...user.toJSON(), token});
        }

        // user found but password is incorrect
        return callback({
            message: 'Invalid username and/or password'
        });
    }

    // user not found
    return callback({
        message: 'Invalid username and/or password'
    });
}

async function register(params, callback) {
    if (params.email === undefined) {
        return callback({ message: 'Email is required'});
    }
    if (params.name === undefined) {
        return callback({ message: 'Name is required'});
    }

    const user = new User(params);
    user.save()
    .then((res) => {
        return callback(null, res);
    })
    .catch((err) => {
        return callback(err);
    });
}

module.exports = {
    login,
    register
};
