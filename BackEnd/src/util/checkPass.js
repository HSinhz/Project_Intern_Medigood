const bcryptjs = require('bcryptjs');

module.exports.verifyPass = (inputPass, hashPass) => {
    return bcryptjs.compareSync( inputPass, hashPass);
}


module.exports.hashPass = async ( Password ) => {
    const salt = await bcryptjs.genSalt(10);
    console.log('salt: ' , salt);
    const passwordHashed = await bcryptjs.hash(Password, salt);
    console.log('passwordHashed: ',passwordHashed);
    return passwordHashed;
}