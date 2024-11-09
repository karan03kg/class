let fs = require ("fs");
let buffer = new Buffer.from("shiv")

console.log(buffer);
console.log(buffer.toString())

fs.readFile("new.txt",(err,data)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log(data.toString());
    }
})