const express = require('express')
const { ErrorHandler } = require('./Middleware/error_handler')
const validate = require('./Middleware/validation')
const db = require("./data.json")
const fs = require("fs")
const isUserPresent = require('./Middleware/user')
const isAuth = require('./Middleware/auth')
// const RouteHandler = require('./argumentControl')
const app = express()
const port = 3000

app.use(express.urlencoded ({extended:false}))

// RouteHandler("request","response");

app.get('/',(req,res)=>{
  res.send("Hello");
})

app.post('/signup',validate, (req, res) => {
  let newUser =req.newUser;
  let database = db;
  database.push(newUser);
  fs.writeFile("data.json",JSON.stringify(database),(err)=>{
    if(err){
      next(err);
    }
    else{
      res.status(201);
      res.send("User Created");
    }
  })

})

app.put("/update/:id", isUserPresent, isAuth, (req, res, next) => {
  let userID = req.params.id;
  let { name, email, password } = req.body;
  let database = db; // array of user data
  let indexofUser = database.findIndex((elm) => elm.id == userID);
  if (indexofUser >= 0) {
      let user = database[indexofUser]; // user data
      let id = user.id;
      database[indexofUser] = {
          id: id,
          name: name,
          email: email,
          password: password,
      };
      let stringified = JSON.stringify(database);
      fs.writeFile("data.json", stringified, (err) => {
          if (err) {
              console.log(err);
          } else {
              res.send(database[indexofUser]);
          }
      });
  } else {
      next(CreateError(404,"Not Found"));
  }
});

app.delete('/delete/:id',isUserPresent,isAuth,(req,res)=>{
  userId = req.params.id;
  let database = db;
  let index = database.findIndex((ele)=> ele.id == userId);
  if(index >= 0){
    let filter = database.filter((ele)=>ele.id != userId);

    fs.writeFile("data.json",JSON.stringify(filter),(err)=>{
      if(err){
        next(err);
      }
      else{
        res.status(200);
        res.send("Request deleted");
      }
    })
  }
  else{
    next(CreateError(404,"Not Found"));
  }
})

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})