const jwt = require('jsonwebtoken');

const getToken = (id, email, name) => {
    const token = jwt.sign({ id, email, name }, process.env.JWT_TOKEN);
    return token
}

const decodedToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    return decoded
}

module.exports = {
    getToken,
    decodedToken
}