const express = require("express");
const todo = require("./todoRouter");
const app = express();
const session = require("express-session");
const auth = require("./authRouter");
const { ErrorHandler } = require("./middleware/errorHandler");
const isAuth = require("./middleware/isAuth");
const TodoDb = require("./TodoDb.json")
const port = 3000;

app.use(express.urlencoded ({extended:false}));
//Session
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge: 1000 * 60 * 60 //sesssion for one hour
    }
}))

app.use("/user",auth)
app.use("/todo",todo)
app.get("/",isAuth,(req,res)=>{
    let userId = req.session.user.id
    let todos = TodoDb;
    let userTodoList = todos[userId] //selecting the specific usertodo list based on ser id
    res.send(userTodoList); //sending all todos
})

app.use(ErrorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})