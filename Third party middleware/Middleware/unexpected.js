const { CreateError } = require("./error_handler")

const UnExpected = (req,res,next)=>{
    next(CreateError(404,"Page Not Found"))
}

module.exports = UnExpected; 