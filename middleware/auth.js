const jwt = require('jsonwebtoken');
const User = require('../database/model');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token == undefined) {
            res.status(400).send({message: "user not login"})
        } else {
            const varifyUser = jwt.verify(token, process.env.KEY);
            const user = await User.findOne({ _id: varifyUser._id, "tokens.tokenid": token });

            if (!user) {
                return new Error('User Not Found');
            }

            req.tokenid = token;
            req.user = user;
            req.userID = user._id
            next()
        }
    } catch (e) {
        res.status(401);
        console.log(`error in auth.js : ${e}`)
    }
}

module.exports = auth