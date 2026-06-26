const jwtStrategy  = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const prisma = require('../lib/prisma');
require('dotenv').config();

const opts = {
jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey: process.env.SECRET_KEY,
}

passport.use(new jwtStrategy(opts, async (payload, done) => {
    const user = await prisma.user.findFirst({
        where: {
            id: payload.id
        }
    })

    if (!user) {
        console.log('invalid')
        return done(null, false);
    } 

    return done(null, user);
}))