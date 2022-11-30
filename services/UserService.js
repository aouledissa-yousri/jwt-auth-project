const HashHelper = require("../helpers/HashHelper")
const RandomHelper = require("../helpers/RandomHelper")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const GLOBAL = require("../GLOBAL")
const TokenController = require("../controllers/TokenController")

class UserService {


    static signUp(payload){
        const salt = HashHelper.generateSalt()
        const result = User.signUp(new User(RandomHelper.genRandomInt(1,100000000), payload.username, HashHelper.hashPassword(payload.password, salt), salt))

        switch(result){
            case "User already exists":
                return {
                    "code": 409,
                    "message": result
                }
            
            case "User account has been created successfully":
                return {
                    "code": 201,
                    "message": result
                }
        }
    }

    static login(payload){

        const result = User.login(payload)

        switch(result.code){
            
            case 200: 
                if(result.hashedPassword === HashHelper.hashPassword(payload.password, result.salt)){
                    
                    const token = jwt.sign({
                        "id": result.id,
                        "username": payload.username,
                        "password": result.hashedPassword,
                        "number": RandomHelper.genRandomInt(1, 1000000)
                    }, GLOBAL.JWT_SECRET_KEY)

                    TokenController.createJWtSession(token)

                    return {
                        "code": 200,
                        "message": "logged in successfully",
                        "token": token
                    }
                }
                    
                
                return {
                    "code": 420,
                    "message": "password is wrong"
                }
            
            case 404:
                return {
                    "code": 420,
                    "message": "user not found"
                }
        }
    }

    static logout(accessToken){
        if(TokenController.endJWTSession(accessToken)) return "Logged out"
    }


    static getUsers(){
        return User.getUsers()
    }
}

module.exports = UserService