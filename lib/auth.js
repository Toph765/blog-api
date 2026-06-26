const passport = require('passport');

function auth(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }
    })
    
    next();
}

module.exports = {
    auth
};