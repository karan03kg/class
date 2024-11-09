//Middlewares
// 1. Application middleware
// 2. Router level middleware
// 3. Error handling middleware
// 4. Built in middleware
// 5. Third party middleware


const express = require('express')
const app = express()
const newRouter = require("./router")
const logger = require('./log')
const port = 3000

//Applicaton level middleware used for whole app
// app.use(express.urlencoded({extended:false}))
// app.use("/get",express.urlencoded({extended:false}))

app.use(logger)
// app.use("/router",newRouter)


//middleware used in these methods known as application level
// app.get()
//app.post()

app.get('/get', (req, res) => {
    const body = req.body;
   res.send(req.log)
})

app.post('/post', (req, res) => {
    const body = req.body;
    res.send(body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})