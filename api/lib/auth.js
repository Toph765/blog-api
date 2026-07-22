const passport = require('passport');

function auth(req, res, next) {
    passport.authenticate('jwt', {session: false})(req, res, next);
};

module.exports = {
    auth
};