const passportAuth = (req, res, next) => {
    console.log('heeellllo');
    console.log(req.session);
    if (req.user) {
        console.log('does user exist', req.user);
        return next();
    }
    return res.redirect('/enter');
};

module.exports = passportAuth;

