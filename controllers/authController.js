const prisma = require('../lib/prisma.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signUpPost(req, res) {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        }
    })
};

async function logInPost(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.email
        }
    })

    if (!(await bcrypt.compare(req.password, user.password)) || !user) {
        res.sendStatus(403);
    }

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    jwt.sign({payload}, process.env.SECRET_KEY, {expiresIn: "1d"}, (err, token) => {
        res.json({
            payload,
            token: "Bearer " + token,
        })
    } )

}

module.exports = {
    signUpPost,
    logInPost
}