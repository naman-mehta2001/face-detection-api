const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors");

const app = express()
//response from frontend for signin would be in json
app.use(express.json());
app.use(cors());

const database = {
    users : [
        {
            id : "123",
            name : "john",
            email : "john@gmail.com",
            password : "cookies",
            entries : 0,
            joined : new Date()
        },
        {
            id : "124",
            name : "sally",
            email : "sally@gmail.com",
            password : "bananas",
            entries : 0,
            joined : new Date()
        },
    ],
    login : [
        {
            id : "987",
            hash : "",
            email : "john@gmail.com",
        }
    ],
}

app.get("/",(_req,res) => {
    res.send(database.users)
})
app.post("/signin",(req,res) => {
    bcrypt.compare('apples', "$2b$10$rLnKtEW22kdi4oCqoPM6yO84QwW03C6ko4iZJ6r/T8j7/hZDjBj0y", function(err, res) {
        if (res) {
         console.log("passwordsmatch");
        } else {
         console.log("Passwords don't match")
        }
      });
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0])
    } else {
        res.status(400).json("error logging in")
    }
})
app.post("/register", (req,res) => {
    const {name,email} = req.body;
    database.users.push({
        id : "125",
        name,
        email,
        entries : 0,
        joined : new Date()
    })
    //sending last user
    res.json(database.users[database.users.length -1])
})
app.get("/profile/:id", (req,res) => {
    let found = false;
    database.users.forEach(user => {
        if(user.id === req.params.id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json("user not found")
    }
})
//to increase entries as images are added
app.put("/image", (req,res) => {
    let found = false;
    database.users.forEach(user => {
        if(user.id === req.body.id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json("user not found")
    }
})
app.listen(3000, () => console.log("app is listening to port 3000"))