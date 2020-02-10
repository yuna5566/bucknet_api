const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_sign_up = async (req, res, next) => {
    try {
        const users = await User.find({email: req.body.email}).exec();
        if (users.length > 0){
            return res.status(409).json({
                status: 409,
                message: 'Email exists. Please use another email.'
            });
        }
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashed_password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender
        });
        await user.save();
        res.status(201).json({
            message: 'User created...'
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

exports.user_log_in = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        console.log(user);
        if (!user){
            return res.status(401).json({
                message: 'Username or Password is incorrect...'
            });
        }
        const success = await bcrypt.compare(req.body.password, user.password);
        if (success){
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
            }, process.env.JWT_KEY, {
                expiresIn: '1h'
            });
            return res.status(200).json({
                message: 'Authentication successful...',
                token: token
            });
        }
        res.status(401).json({
            message: 'Authentication failed...'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error}); 
    }
    
}

exports.delete_user = async (req, res, next) => {
    try {
        await User.deleteOne({_id: req.params.userId});
        res.status(200).json({
            message: 'User deleted...'
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({error: err}); 
    }
}