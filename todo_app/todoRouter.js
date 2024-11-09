// const express = require("express");
const todo = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path")
const TodoDb = require("./TodoDb.json");
const isAuth = require("./middleware/isAuth");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"todoImage/")
    },
    filename: (req,file,cb)=>{
        let filename = file.originalname;
        cb(null,filename)
    }
});
const singleUpload = multer({
    storage: storage
}).single("image");

const option = { root: path.join(__dirname, "public/") }

todo.get("/add",isAuth,(req,res)=>{
    res.sendFile("AddTodo.html",option)
})

//Create todo
todo.post("/",singleUpload,isAuth,(req, res,next) => {
    let domainName = "localhost:3000/" 
    let file = req.file;
    let {title,desc,status} = req.body;
    let database = TodoDb;
    let TodoItem = {
        id:new Date().getTime(),
        userId: req.session.user.id,
        title,
        desc,
        status,
        image : domainName + file.originalname
    }


    database[req.session.user.id].push(TodoItem);
    fs.writeFile("TodoDb.json",JSON.stringify(database),(err)=>{
        if(err){
            next(err)
        }
        else{
            res.send({
                title: title,
                message: "Your Todo Item Added Successfully"
            })
        }
    })
})

//Read todo
todo.get("/", isAuth, (req, res) => {
    let todos = TodoDb;
    let userTodoList = todos[req.session.user.id] //selecting the specific usertodo list based on ser id
    res.send(userTodoList); //sending all todos
})

//Update-put/patch
todo.put("/:id",singleUpload,isAuth, (req, res,next) => {
    let domainName = "localhost:3000/" 
    let TodoId = req.params.id;
    let file = req.file;
    let {title,desc,status} = req.body;
    let database = TodoDb;
    let index = database.findIndex((ele) => ele.id == TodoId);
    if (index >= 0) {
        let updateItem = {
            id : database[index].id,
            title,
            desc,
            status,
            image : domainName + file.originalname
        }

        database[index] = updateItem;
        fs.writeFile("TodoDb.json",JSON.stringify(database),(err)=>{
            if(err){
                next(err)
            }
            else {
                res.send({
                    id:database[index].id,
                    message:"Your Todo Item Updated"
                })
            }
        })
    }
    else{
        res.send({
            id:TodoId,
            message:"Todo Item Not Found"
        })
    }
});

//patch
todo.patch("/:id",singleUpload,isAuth,(req, res,next) => {
    let domainName = "localhost:3000/" 
    let TodoId = req.params.id;
    let file = req.file;
    let {title,desc,status} = req.body;
    let database = TodoDb;
    let index = database.findIndex((ele) => ele.id == TodoId);
    if (index >= 0) {
        let updateItem = {
            ...database[index]
        }
        if(title){
            updateItem.title = title;
        }
        else if(desc){
            updateItem.desc = desc;
        }
        else if(status){
            updateItem.status = status;
        }
        else if(file){
            updateItem.image = domainName + file.originalname;
        }
        else{
            updateItem = updateItem;
        }

        database[index] = updateItem;
        fs.writeFile("TodoDb.json",JSON.stringify(database),(err)=>{
            if(err){
                next(err)
            }
            else {
                res.send({
                    id:database[index].id,
                    message:"Your Todo Item Updated with Patch request"
                })
            }
        })
    }
    else{
        res.send({
            id:TodoId,
            message:"Todo Item Not Found"
        })
    }
})

//Delete -(delete via id)
todo.delete("/:id",isAuth, (req, res,next) => {
    let TodoId = req.params.id;
    let database = TodoDb;
    let userTodoList = database[req.session.user.id]; //user todo list []
    let index = userTodoList.findIndex((ele) => ele.id == TodoId); //finding todo item
    if (index >= 0) {

        let filter = userTodoList.filter((ele) => ele.id != TodoId);  //exclude item

        database[req.session.user.id] = filter;  //rewriting array where todo is removed
        fs.writeFile("TodoDb.json", JSON.stringify(database), (err) => {
            if (err) {
                next(err)
            }
            else {
                res.send({
                    id:userTodoList[index].id,
                    message:"Todo Item Deleted"
                })
            }
        })
    }
    else {
        res.send({
            id:TodoId,
            message:"Todo Item Not Found"
        })
    }

})

module.exports = todo;