const express = require("express")
const app = express();
const port = 3000;

const isfilled = null;
app.get("/",(req,res)=>{
    res.render("home");
})