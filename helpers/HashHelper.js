const bcrypt = require("bcrypt")


class HashHelper {

    static hashPassword(password, salt){
        return bcrypt.hashSync(password, salt)
    }

    static generateSalt(){
        return bcrypt.genSaltSync(10)
    }
}

module.exports = HashHelper