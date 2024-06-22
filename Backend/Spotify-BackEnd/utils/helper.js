const jwt = require('jwt');
exports = {}
exports.getToken=()=>{
    const token = jwt.sign({identifier:user._id});
    return token;

}

module.exports = exports