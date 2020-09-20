const passportAuth = (req, res, next) => {
    console.log(req.session);
    if (req.user) {
        return next();
    }
    return res.redirect('/enter');
};

module.exports = passportAuth;

