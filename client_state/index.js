const express = require("express");
const app = express();
const session = require("express-session");
const LoginRouter = require("./LoginRouter");
const port = 3000;

app.use(express.urlencoded ({extended:false}));

app.use(session({
    secret: "this is secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 6000  //1m max age of this session
    }
}));

app.use("/user",LoginRouter);

app.get("/",(req,res)=>{
    console.log(req.session.id);
    if(!req.session.views){
        req.session.views = 1;
    }
    else{
        req.session.views++;
    }
    let views = req.session.views;
    res.send(String(views));
})

app.post("/",(req,res)=>{
    res.send("post");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})