
exports.redirectIfAuthenticated = (req, res, next) => {
    if (req.user) {
        res.redirect('/secret');
    }
    return next();
};