const http = require ("http");
const fs = require ("fs");
const home = require("./getRoute")

const server = http.createServer((req,res)=>{
    let{header,method,url}=req;
    console.log(url);
    if(url == "/"){
        res.writeHead(200,{"Context.Type":"plain/text"});
        res.end("Your data seved to database");
        console.log("Hello");
    }
    else if(url == "/home"){
        res.writeHead(200,{"Context.Type":"plain/text"});
        res.end(home);
        console.log("Home");
    }
    // let{header,method,url}=req;
    // console.log(url);
    // if(url == "/home"){
    //     res.writeHead(200,{"Context.Type":"plain/text"});
    //     res.end(home);
    //     console.log("hello");
    // }
});

server.listen(3000,()=>{

})