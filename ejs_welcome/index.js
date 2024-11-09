const express = require("express")
const app = express();
const fs = require("fs")
const port = 3000;


app.set("view engine","ejs");
app.set("views","./views")

app.use(express.urlencoded ({extended:false}))
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.get("/welcome",(req,res)=>{
    let name = req.body.name;
    console.log(name);
    let time = new Date();
    let options = { timeZone: 'Asia/Kolkata', hour12: false };
    let indianTime = time.toLocaleTimeString('en-IN', options);
    console.log(indianTime);
    let hours = time.toLocaleTimeString('en-IN', { hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

    if(hours <= 12){
        res.render("home",{username:name,tme:"Good Morning"});
        // console.log("Good morning")
    }
    else if(hours >12){
        res.render("home",{username:name,tme:"Good Afternoon"});
        // console.log("Good afternoon")
    }

    // res.render("home",{username:name,tme:indianTime});
})


app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})