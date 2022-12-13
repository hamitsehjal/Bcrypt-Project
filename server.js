const express = require("express")
const app = express()

const bcrypt = require("bcrypt")


let users = [

]

app.use(express.json())
app.get("/users", (req, res) => {
    res.json(users)
})

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.username === req.body.username)

    if (user === null) {
        return res.status(400).send()
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("SUCCESS")
        } else {
            res.send("NOT ALLOWED")
        }
    } catch (err) {
        res.status(500).send(err)
    }


})

app.post("/users", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)


        const user = {
            username: req.body.username,
            password: hashedPassword
        }
        users.push(user)
        res.status(200).send()
    }
    catch {
        res.status(500).send()
    }
})
app.listen(4000, () => {
    console.log("Express Server listening on Port 4000")
})