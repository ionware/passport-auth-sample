/**
 * This Fn will handle our 404 Error. It basically
 * create error message, add status to it and send to the
 * next error Middleware.
 */
exports.notFound = (req, res, next) => {
    const error = new Error('Request page not Found.');
    error.status = 404;
    next(error);
};

exports.developmentErrors = (err, req, res, next) => {
    // Then it is a 404 Error from previous notFound middleware.
    if (err.status === 404) {
        res.status(404);
        return res.render('error', {
            title: 'Not Found.'
        })
    }

    res.json(JSON.stringify(err, null, 2));
};

// Setup Production error here...