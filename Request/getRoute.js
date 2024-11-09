const http = require("http");
const fs = require("fs");

const home = ()=>{
    const server = http.createServer((req,res)=>{
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
    });
}
// server.listen(3000,()=>{

// })
module.exports = home