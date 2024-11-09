const express = require('express')
const unexpected = require('./error_middleware')
const {ErrorHandler,CreateError} = require('./error_handler')
const new_logger = require('./new_log')
const app = express()
const port = 3000

//Application level middleware for maintaining logs
app.use(new_logger);

// let error = new Error();
// console.log(error);

let mypassword = 123456;
app.get('/get/:password', (req,res,next) => {
    let password = req.params.password;
    if(password == mypassword){
        res.send("Application level get request successfully received");
    }
    else{
        next(CreateError(401,"Do not type it again"));
    }
})

app.post('/post', (req, res) => {
    res.send('Application level post')
})

app.put('/put', (req, res) => {
    res.send('Application level put')
})

app.patch('/patch', (req, res) => {
    res.send('Application level patch')
})

app.delete('/delete', (req, res) => {
    res.send('Application level delete')
})


//Application level middleware for unexpected route handling
app.use(unexpected);

//Application level middleware error handler to send error response
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})