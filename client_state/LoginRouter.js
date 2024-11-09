const express = require('express')
const LoginRouter = express()
const port = 3000
const userDb = require("./data.json");
const fs = require("fs");
const isAuth = require('./middleware/isAuth');

LoginRouter.get('/register', (req, res) => {
  res.sendFile('register.html',{root:(__dirname)})
})


LoginRouter.post("/register",(req,res)=>{
    let {name,email,password} = req.body;

    let user = {
        id: new Date().getTime(),
        name,
        email,
        password
    }

    let database = userDb;
    database.push(user);
    fs.writeFile("data.json",JSON.stringify(database),(err)=>{
        if(err){
            res.send("Internal server error")
        }
        else{
            res.send("User Created Successfully")
        }
    })
})

LoginRouter.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:(__dirname)});
})

LoginRouter.post("/login",isAuth,(req,res)=>{
    let {email,password} = req.body;
    let database = userDb;
    let index = database.findIndex((ele)=>ele.email.toLowerCase() == email.toLowerCase());
    if(index >= 0){
        if(database[index].password == password){
            //Create a login session
            req.session.user = database[index]  //created
            //a session for this user
            res.send(`${database[index].email} is Logged in`)
        }
        else{
            res.send("Wrong Password");
        }
    }
    else{
        res.send("User Not Found");
    }
})

LoginRouter.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send("Error while logout");
        }
        else{
            res.send("Logged Out Successfully");
        }
    });
});

module.exports = LoginRouter;