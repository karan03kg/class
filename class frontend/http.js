const http = require ("http");
const fs = require("fs");
const { stringify } = require("querystring");
let json = {
    name:"karan",
    class:"G-10"
}
const server = http.createServer((req,res)=>{
    // res.writeHead(200,{"Context.Type":"text/plain"});
    // res.end(JSON.stringify(json));
    let{headers,method,url}=req;
    // console.log(method);
    if(method == "GET"){
        console.log(method);
    if(url == "/home"){
        fs.readFile("home.html","utf-8",(err,data)=>{
            if(err){
                console.log("Error");
            }
            else{
                let homepage = data;
                res.writeHead(200,{"Context.Type":"plain/text"});
                res.end(homepage);
            }
        })
    }
    else if(url == "/register"){
        fs.readFile("register.html","utf-8",(err,data)=>{
            if(err){
                console.log("Error");
            }
            else{
                let registerpage = data;
                res.writeHead(200,{"Context.Type":"plain/text"});
                res.end(registerpage);
            }
        })
    }
    else if(url == "/"){
        res.writeHead(200,{"Context.Type":"plain/text"});
        res.end("Hello,this is empty page");
    }
    else{
        res.writeHead(200,{"Context.Type":"plain/text"});
        res.end("404-Page not found");
    }
}
    else{
    if(url == "/register"){
        res.writeHead(200,{"Context.Type":"plain/text"});
        res.end("Your data seved to database");
    }
    // console.log("Post")
}

    // console.log(headers,method,url)
    // console.log(req);
});

server.listen(4000,()=>{
    console.log("Server is running")
})