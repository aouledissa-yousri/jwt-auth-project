const users = require("../persistence/users")

class User {

    #id;
    #username;
    #password;
    #salt;

    constructor(id, username, password, salt) {
        this.#id = id
        this.#username = username
        this.#password = password,
        this.#salt = salt
    }

    getId(){
        return this.#id
    }

    getUsername(){
        return this.#username
    }

    getPassword(){
        return this.#password
    }

    getSalt(){
        return this.#salt
    }

    setId(id){
        this.#id = id
    }

    setUsername(username){
        this.#username = username
    }

    setPassword(password){
        this.#password = password
    }

    setSalt(salt){
        this.#salt = salt
    }

    getData(){
        return {
            "id": this.#id,
            "username": this.#username,
        }
    }

    static signUp(user){
        
        for(let i = 0; i < users.length; i++) if(users[i].getUsername() === user.getUsername()) return "User already exists"
        
        users.push(user)
        return "User account has been created successfully"
    }

    static login(payload){
        for(let i = 0; i < users.length; i++)
            if(users[i].getUsername() === payload.username) 
                return {
                    "code": 200,
                    "hashedPassword": users[i].getPassword(),
                    "salt": users[i].getSalt()
                }
                
        return {
            "code": 404
        }
    }

    static getUsers(){
        let userList = []
        for(let i = 0; i < users.length; i++) userList.push(users[i].getData())
        return userList
    }
}


module.exports = User