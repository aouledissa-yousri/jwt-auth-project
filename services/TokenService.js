const { default: jwtDecode } = require("jwt-decode");
const RandomHelper = require("../helpers/RandomHelper")
const Token = require("../models/Token");


class TokenService {

    static createJWTSession(accessToken) {
        Token.createJWTSession(new Token(RandomHelper.genRandomInt(1,100000000), accessToken, jwtDecode(accessToken).iat))
        return "JWT Session has been created"
    }

    static endJWTSession(accessToken) {
        return Token.endJWTSession(accessToken)
    }

    static checkAccessToken(accessToken) {
        return Token.checkAccessToken(accessToken)
    }
}

module.exports = TokenService