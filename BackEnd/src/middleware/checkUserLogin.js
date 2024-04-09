
const checkUserLogin = (req, res, next) => {
    const nonSecurePaths = ['/api/home', '/', '/api/shopowner/register' , '/api/v1/login' ];
    if( nonSecurePaths.includes(req.path)){
        return next();
    }
    
}

module.exports = {
    checkUserLogin,
}