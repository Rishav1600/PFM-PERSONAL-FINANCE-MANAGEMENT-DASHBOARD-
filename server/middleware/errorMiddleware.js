const errorHandler = (err, req, res, next) => {
    // If the status code is already set to an error code, use it. Otherwise, default to 500 (Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        // Only send the stack trace in development mode for easier debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    errorHandler,
};
