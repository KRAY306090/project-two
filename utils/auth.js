const passportAuth = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.redirect('/');
};

module.exports = passportAuth;