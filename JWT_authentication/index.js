const express = require("express")
const JWT = require("jsonwebtoken")
const app = express();
const UserDB = require("./data.json")
const port = 3000;


app.use(express.urlencoded ({extended:false}));

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.post("/login",(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    let find = UserDB.find((ele)=>username.toLowerCase() == ele.username.toLowerCase());  //if user found it returns user else undefined

    if(find){
        // let {password, ...payload} = find  It will exclude the password ans user other from find

        let{email,username,name} = find;
        let payload = {email,username,name}
        // delete payload.password;
        if(find.password === password){
            let token = JWT.sign(payload,"signature",{expiresIn:"1h"});  //create jwt on successfull login

            res.send({
                message:"Token Created Successfully",
                token
            })
        }
        else{
            res.send({
                message:"UnAuthorised",
                status:401
            })
        }
    }
    else{
        res.send({
            message:"User not found",
            status: 404
        })
    }
})

app.get("/verify",(req,res)=>{
    let token = req.body.token;

    JWT.verify(token,"signature",(err,decode)=>{
        if(err){
            res.send({
                message:"Access Denied",
                status: 403
            })
        }
        else{
            res.send({
                message:"Token Verified Successfully",
                userData: decode
            })
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})