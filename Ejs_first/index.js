const express = require("express")
const app = express()
const port = 3000;

app.use(express.static("public"));

app.set("view engine","ejs");
app.set("views","./views");

let name = "Karan";
let users =["Karan","Garg","Kunal"]; 
app.get("/",(req,res)=>{
    res.render("home",{myName : name,pageName:"Home"});
})

app.get("/home",(req,res)=>{
    res.redirect("/")
})

app.get("/about",(req,res)=>{
    res.render("about",{pageName:"About"})
})

app.get("/users",(req,res)=>{
    res.render("user",{userData:users,pageName:"User"})
})

app.get("/contact",(req,res)=>{
    res.render("contact",{pageName:"Contact"})
})

app.get("/navbar2",(req,res)=>{
    res.render("navbar2");
})

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`)
})