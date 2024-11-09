// const add = require("./math")
// import {add,sub} from "./math.js"
// console.log(add(2,3));
// console.log(sub(4,1))

import fs from "fs"
// fs.appendFile("new.txt","hello",()=>{
//     console.log("done");
// });
// fs.readFile("./new.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log("error");
//     }
//     else{
//         console.log(data);
//     }
// })

// // fs.writeFile("./main.html","Hello world",()=>{
// //     console.log("Done");
// // })

let json = JSON.stringify({
    name:"joel",
    class:"G-10",
    college:"Chitkara"
})

// fs.writeFile("main.html",json,()=>{
//     console.log("Done");
// })

// fs.readFile("main.html","utf-8",(err,data)=>{
//     if(err){
//         console.log("error");
//     }
//     else{
//         console.log(data);
//     }
// })

// fs.writeFile("data.json",json,()=>{
//     console.log("done");
// })


fs.readFile("data.json","utf-8",(err,data)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log(data);
    }
})

