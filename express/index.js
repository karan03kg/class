const express = require('express')
const fs = require("fs");
const app = express()
const path = require("path")
const data = require("./data.json")
const port = 3000

const dirname = __dirname;

app.use("/public",express.static({root:dirname}.root));

// app.get('/:name', (req, res) => {
// //   res.sendFile("home.html",{root:dirname});
// // res.send({name:"Karan",batch:"G-10"})
// // console.log(dirname);
//    let queryparams = req.params.name;
//    res.send(`This is parameter : ${queryparams}`)
// //    console.log(queryparams);
// })

app.get('/', (req, res) => {
    // res.send("Hello about")
    res.sendFile("home.html",{root:dirname})
})

let arrayDatabase = [
    {name:"karan",email:"karan@gmail.com",pass:"1234"},
    {name:"harry",email:"harry@gmail.com",pass:"54321"}
]

app.get('/about', (req, res) => {
    // res.send("Hello about")
    res.sendFile("about.html",{root:dirname})
    let name = req.query.name;
    let filtered = arrayDatabase.filter((ele,i)=>name.toLowerCase()==ele.name.toLowerCase());
    console.log(filtered[0]);
    // console.log(req.query);
    res.send(filtered[0]);
})

app.get('/register', (req, res) => {
    res.sendFile("/register.html",{root:dirname})
})

app.use(express.urlencoded({extended:false}))

//post route

app.post('/register', (req, res) => {
    // console.log(req.body);
    // console.log(data);
    let database = data;
    let arr = req.body;
    // console.log(arr);
    let {email} = req.body;
    let filtered = database.filter((ele)=>ele.email.toLowerCase() == email.toLowerCase());
    // console.log(filtered);
    if(filtered.length > 0){
        res.send("This email already exists");
    }
    else{
        database.push(arr);
        // res.send("Request Received");
        fs.writeFile("data.json",JSON.stringify(database),(err)=>{
            if(err){
                console.log("error");
            }
            else{
                res.send("Your data saved to database");
            }
        })
    }
})

//delete route

app.delete('/delete',(req,res)=>{
    let {email} = req.body;
    let database = data;
    let filtered = database.filter((ele)=>ele.email.toLowerCase() != email.toLowerCase());
    fs.writeFile("data.json",JSON.stringify(filtered),(err)=>{
        if(err){
            console.log("Error");
        }
        else{
            res.send(`Received Delete request for : ${email}`);
        }
    })
})

//put route
app.put('/update', (req, res) => {
    let {email,name} = req.body;
    let database = data;
    let findIndex = database.findIndex((ele)=>ele.email.toLowerCase()==email.toLowerCase());
    console.log(findIndex);
    database[findIndex].name = name;
    fs.writeFile("data.json",JSON.stringify(database),(err)=>{
        if(err){
            console.log("Error");
        }
        else{
            res.send(`Received update request for : ${email} `)
        }
    })
})

app.get('*', (req, res) => {
    res.send("404 Not Found");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})