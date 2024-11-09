const express = require("express")
const {connectMongo,client} = require("./db");
const { ObjectId } = require("mongodb");
const app = express()
const port = 3000

const dbName = "Todo";
const db = client.db(dbName);

const users = db.createCollection("users");

app.use(express.urlencoded ({extended:false}))

app.get("/",async(req,res)=>{
    const allUser = await (await users).find().toArray();
    // console.log(data);
    res.send(allUser);
})

app.post("/",async(req,res)=>{

    let {name,email,password}=req.body;

    (await users).insertOne({
        name,
        email,
        password
    })

    // const user = {
    //     name:"Karan",
    //     email:"karan123@gmail.com",
    //     password:123
    // }

    // await usersCollection.insertOne(user);
    
    res.send("User added successfully");
})

app.patch("/update/user/:id",async(req,res)=>{
    let userid =req.params.id;
    let email = req.body.email;
    // console.log(userid); 
    (await users).updateOne({_id:new ObjectId(userid)},{$set:{email}});

    res.send("changed");
})

app.delete("/delete/user/:id",async(req,res)=>{
    let userid =req.params.id;
    (await users).deleteOne({_id:new ObjectId(userid)});

    res.send("deleted");
})

app.listen(port,()=>{
    // if(err){
    //     console.log("Error");
    // }
    // else{
        connectMongo().then(()=>{
            console.log(`Server is running on port : ${port}`)
        })
    // }
})