const db = require("../data.json");
const { CreateError } = require("./error_handler");
const isUserPresent = (req,res,next)=>{
    let id = req.params.id;
    let database = db;
    let index = database.findIndex((ele)=>ele.id == id);
    if(index>=0){
        req.user = database[index];
        next();
    }
    else{
        next(CreateError(404,"User Not Found"));
    }
}

module.exports = isUserPresent;