const express = require('express')
const app = express()
const data = require("./data.json")
const fs = require("fs")
const port = 3000

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// console.log(new Date().getTime())
//create
app.post('/register', (req, res) => {
    // gettin user data from request
    let {name,email,password} = req.body;

    //creating user data object
    let useData = {
        id:new Date().getTime().toString().slice(6),//unique id for each user
        name:name,
        email:email,
        password:password
    }

    // accessing data from dat.json
    let database = data;

    //filtering for check data dublicacy
    let filter = database.filter((ele)=>ele.email.toLowerCase() == email.toLowerCase());

    //Preventing duplicate
    if(filter.length > 0){
        res.send(`${email} is already exists`);
    }
    else{
        //pushing data
        database.push(useData);
        //creating data.json and storing users data
        fs.writeFile("data.json",JSON.stringify(database),(err)=>{
            if(err){
                console.log("Error");
            }
            else{
                res.send(`User data received ${name}, ${email}, ${password}`);
            }
        })
    }
})

//Read
app.get('/user/:id', (req, res) => {
    //getting id from req parameter
    let userId = req.params.id;
    let database = data;

    //getting index of object data userId in data.json
    let index = database.findIndex((ele)=>ele.id == userId);
    if(index >= 0){
        let userobj = database[index] //user data on basis of userId
        res.send(userobj);
    }
    else{
        res.send(`${userId} your request is not avai`)
    }

    // res.send('Read request received')
})

//Update
app.put('/update/:id', (req, res) => {
    let userId = req.params.id;
    let {name,email,password} = req.body;
    let database = data;  //array of user
    let indexofUser = database.findIndex((ele)=>ele.id == userId);
    if(indexofUser >= 0){
        let user = database[indexofUser];  //user data
        let id = user.id;
        database[indexofUser] = {
            id: id,
            name: name,
            email: email,
            password: password
        }
        fs.writeFile("data.json",JSON.stringify(database),(err)=>{
            if(err){
                console.log("Error");
            }
            else{
                res.send(database[indexofUser]);
            }
        })
    }else{
        res.send(`${userId} userid is not available`);
    }
    // res.send('Put request received')
})

//Update one
app.patch('/update-one/:userId', (req, res) => {
    let userId = req.params.userId
    let name = req.query.name
    let database = data;
    let indexofUser = database.findIndex((ele)=>ele.id==userId);
    if(indexofUser >= 0){
        database[indexofUser].name = name;
        fs.writeFile("data.json",JSON.stringify(database),(err)=>{
            if(err){
                console.log("Error");
            }
            else{
                res.send(database[indexofUser]);
            }
        })
    }
    else{
        res.send(`User not found ${userId}`);
    }
    // res.send(`Patch request received: ${name}`)
})

//Delete
app.delete('/delete/:userId', (req, res) => {
    let userId = req.params.userId;
    let database = data;
    let indexofUser = database.findIndex((ele)=>ele.id == userId);
    if(indexofUser >= 0){
        let filter = database.filter((ele)=>ele.id != userId);
        fs.writeFile("data.json",JSON.stringify(filter),(err)=>{
            if(err){
                console.log("Error");
            }
            else{
                res.send(`${userId} userid is deleted`);
            }
        })
    }
    else{
        res.send("User not found");
    }

    // res.send('Delete request received')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})