const UserService = require("../services/UserService")


class UserController {

    static signUp(payload){
        return UserService.signUp(payload)
    }

    static login(payload){
        return UserService.login(payload)
    }

    static logout(accessToken){
        return UserService.logout(accessToken)
    }

    static getUsers(){
        return UserService.getUsers()
    }
}

module.exports = UserController