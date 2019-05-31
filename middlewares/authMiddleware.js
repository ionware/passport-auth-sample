
exports.redirectIfAuthenticated = (req, res, next) => {
    if (req.user) {
        res.redirect('/secret');
    }
    return next();
};

exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'Please sign in before seeing the secret message.');
        return res.redirect('/login');
    }
    return next();
};