const tokens = require("../persistence/tokens")

class Token {

    constructor(id, accessToken, userId){
        this.id = id
        this.accessToken = accessToken
        this.userId = userId
    }

    static createJWTSession(token){
        tokens.push(token)
        return 201
    }

    static endJWTSession(token){
        token.splice(tokens.indexOf(token), tokens.indexOf(token))
        return true
    }

    static checkAccessToken(accessToken){
        for(let i = 0; i < tokens.length; i++) if(tokens[i].accessToken === accessToken) return true
        return false
    }
}

module.exports = Token