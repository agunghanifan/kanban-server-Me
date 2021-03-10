const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const decodePassword = (password, passwordDb) => {
    let result = bcrypt.compareSync(password, passwordDb);
    return result
}

module.exports = {
    hashPassword,
    decodePassword
}