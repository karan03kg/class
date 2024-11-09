const express = require("express")
const app = express()
const port = 4000;

app.set("view engine","ejs")
app.set("views","./views")
app.get("/todo",(req,res)=>{

    res.render("todo")
})


app.listen(port,()=>{
    console.log(`Server is running on poty : ${port}`)
})