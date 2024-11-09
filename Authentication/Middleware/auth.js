const db = require("../data.json");
const { CreateError } = require("./error_handler");
const isAuth = (req,res,next)=>{
    let {password} = req.body;
    let user = req.user;
    if(password == user.password){
        next();
    }
    else{
        next(CreateError(401,"UnAutharized"));
    }
}
module.exports = isAuth;