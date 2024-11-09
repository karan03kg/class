// const express = require("express")
// const router = express.Router();
const fs = require("fs");
const { CreateError } = require("./error_handler");
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

// module.exports = router


    function new_logger(req,res,next){
            const log = `${new Date().getTime()} - ${req.method} - ${req.url}`
            console.log(log);
            req.log = log;
            fs.writeFile("logger.txt",log+"\n",{flag:"a"},(err)=>{  //flag a is for append or we use file append
                if(err){
                    next((CreateError(500,"Error occured while writting file")));
                }
                else{
                    next();
                }
            })
        
            //By usin append file function
            // fs.appendFile("logger.txt",log+"\n",(err)=>{  //flag a is for append or we use file append
            //     if(err){
            //         console.log("Error");
            //     }
            //     else{
            //         next();
            //     }
            // })
        
        }


module.exports = new_logger