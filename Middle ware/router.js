const express = require("express");

const router = express.Router();
const newlog = require("./log")
const fs = require("fs") 

//router level middleware
// router.use((req,res,next)=>{
//     const log = `${new Date().getTime()} - ${req.method} - ${req.url}`
//     console.log(log);
//     req.log = log;
//     // fs.writeFile("logger.txt",log+"\n",{flag:"a"},(err)=>{  //flag a is for append or we use file append
//     //     if(err){
//     //         console.log("Error");
//     //     }
//     //     else{
//     //         next();
//     //     }
//     // })

//     //By usin append file function
//     fs.appendFile("logger.txt",log+"\n",(err)=>{  //flag a is for append or we use file append
//         if(err){
//             console.log("Error");
//         }
//         else{
//             next();
//         }
//     })

// })

router.use(newlog);

router.get("/get",(req,res)=>{
    res.send(req.log);
})

router.post("/post",(req,res)=>{
    res.send(req.log);
})

module.exports = router;