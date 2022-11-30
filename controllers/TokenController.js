const TokenService = require("../services/TokenService");


class TokenController {

    static createJWtSession(accessToken){
        return TokenService.createJWTSession(accessToken)
    }

    static endJWTSession(accessToken){
        return TokenService.endJWTSession(accessToken)
    }

    static checkAccessToken(accessToken){
        if(accessToken !== undefined)
            if(TokenService.checkAccessToken(accessToken)) 
                return {
                    "code": 200,
                    "message": "token verified"
                }
    
        return {
            "code": 404,
            "message": "invalid token"
        }


    }
}

module.exports = TokenController