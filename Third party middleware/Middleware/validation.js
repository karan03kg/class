const { CreateError } = require("./error_handler");
const db = require("../data.json")
const validate = (req,res,next)=>{
    let {name,email,password} = req.body;
    // let user = req.user;
    if(name && email && password){
        let database = db;
        let index = database.findIndex((ele)=>ele.email.toLowerCase() == email.toLowerCase());
        if(index >= 0){
            next(CreateError(208,"User Already Exists"))
        }
        else{
            let newUser = {
                id : new Date().getTime().toString().slice(5),
                name,
                email,
                password
            }
            req.newUser = newUser;
            next();
        }
    }
    else{
        next(CreateError(416,"Not Acceptable - name,email & password required"));
    }
}

module.exports = validate;