const express = require("express")
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.set("views","./views");

const books = ["Harry Potter","Atomic Habbits","The Fountain"];
const movies = ["Avengers","It","E.T"]

app.get("/",(req,res)=>{
    // res.send("hello");
    res.render("home",{results:[]});
})

app.get("/search",(req,res)=>{
    const query = req.query.query;
    let results = [];
    if(query === "books"){
        results = books;
    }
    
    else if(query === "movies"){
        results = movies;
    }
    res.render('home', { results });
    // res.send("Hello")
})

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`)
})