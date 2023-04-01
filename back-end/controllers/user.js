const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                profilePicture: url + '/images/' + req.file.filename,
                gender: req.body.gender
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error:error
                    });
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    db.User.findOne({where: {email: req.body.email}}).then(
        (user) => {
            if(!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect Password!')
                        });
                    }
                    const token = jwt.sign(
                        {userId: user.iduser}, 
                        'SECRET_TOKEN_HOTTAKES',
                        {expiresIn: '24h'});
                    res.status(200).json({
                        userId: user.iduser,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error:error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};