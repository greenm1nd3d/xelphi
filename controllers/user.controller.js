const bcryptjs = require('bcryptjs');
const userService = require('../services/user.services');

exports.register = (req, res, next) => {
    const { name, email, password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    userService.login({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.profile = (req, res, next) => {
    return res.status(200).json({ message: 'Authorized user' });
};
