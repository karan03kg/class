const auth = require("express").Router();
const path = require("path");
const fs = require("fs")
const multer = require("multer");
const userDb = require("./userDb.json")
const TodoDb = require("./TodoDb.json")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "userImage/")
    },
    filename: (req, file, cb) => {
        let filename = file.originalname;
        cb(null, filename)
    }
});
const singleUpload = multer({
    storage: storage
}).single("image");



const option = { root: (__dirname, "public") }
auth.get("/register", (req, res) => {
    //Send register form
    res.sendFile("Register.html", option)
})

auth.post("/register", singleUpload, (req, res, next) => {
    //Access register from data
    let domainName = "localhost:3000/"
    let file = req.file;
    let { name, email, password } = req.body;
    // console.log(name);
    let database = userDb;
    let index = database.findIndex((ele) => ele.email == email);
    if (index >= 0) {
        res.send({
            email,
            message: "User is already present use another email"
        })
    }
    else {
        let newUser = {
            id: new Date().getTime(),
            name,
            email,
            password,
            image: domainName + file.originalname
        }
        database.push(newUser);
        fs.writeFile("userDb.json", JSON.stringify(database), (err) => {
            if (err) {
                next(err);
            }
            else {
                // res.send({
                //     name: name,
                //     message: "New User Created"
                // })

                // Initializing a todo list for this new user
                let todoDb = TodoDb;
                todoDb[newUser.id] = [];
                fs.writeFile("TodoDb.json", JSON.stringify(todoDb), (err) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        res.send({
                            name: name,
                            message: "New User Created"
                        })
                    }
                })

            }
        })
    }
})

auth.get("/login", (req, res) => {
    //Send login form
    if(req.session.user){
        res.redirect("/");
    }
    else{
        res.sendFile("Login.html", option)
    }
})

auth.post("/login", (req, res) => {
    //Access login form data
    let { email, password } = req.body;
    let database = userDb;
    let index = database.findIndex((ele) => ele.email.toLowerCase() == email.toLowerCase());
    if (index >= 0) {
        if (database[index].password == password) {
            //Create Login Session for user
            req.session.user = database[index];
            // res.send({
            //     email,
            //     message: "User Logged in"
            // })
            res.redirect("/")  //redirecting to home page
        }
        else {
            res.send({
                message: "Wrong Email or Password"
            })
        }
    }
    else {
        res.send({
            email: email,
            message: "User Not Found"
        })
    }
})

auth.get("/logout", (req, res, next) => {
    //destroy login session
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        else {
            res.send({
                message: "User Logged Out Successfully"
            })
        }
    })
})

module.exports = auth;