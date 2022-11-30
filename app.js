const express = require('express')
const cors = require('cors')

const UserController = require("./controllers/UserController")
const TokenController = require('./controllers/TokenController')

const app = express()

corsOptions = []

app.use(cors(corsOptions))
app.use(express.json())



app.post("/user", (request, response) => response.send(UserController.signUp(request.body)))
app.post("/login", (request, response) => response.send(UserController.login(request.body)))

app.get("/logout", (request, response, next) => {
    const result = TokenController.checkAccessToken(request.headers.token)
    if(result.code === 200) next()
    else response.send(result)
}, (request, response) => response.send(UserController.logout(request.headers.token)))

app.get("/users", (request, response, next) => {
    const result = TokenController.checkAccessToken(request.headers.token)
    if(result.code === 200) next()
    else response.send(result)
}, (request, response) => response.send(UserController.getUsers()))




let port = parseInt(process.argv[2])
if(Number.isNaN(port)) port = 3000

app.listen(port, () => {
    console.log("Application is running on http://localhost:"+port)
})
