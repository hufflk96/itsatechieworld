const withAuth = (req, res, next) => {
    if (req.session && req.session.logged_in) {
        next();
    } else {
        res.json({message:"You are not logged-in! Please login to continue!"});
    }
}

module.exports = { withAuth };
