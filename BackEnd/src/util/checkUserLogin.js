
module.exports = checkUserLogin = ( req, res, next ) => {
    const nonSecurePaths = []
    if( nonSecurePaths.includes(req.path)){
        return next();
    }
    next();
}