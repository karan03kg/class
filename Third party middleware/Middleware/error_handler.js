const CreateError = (status,message)=>{
    let error = new Error();
    error.status = status;
    error.message = message;
    return error;
}

const ErrorHandler = (err,req,res,next)=>{
    let status = err.status || 500;
    let message = err.message || "Internel Server Error"
    res.status(status);
    res.send(message)
}

module.exports = {
    ErrorHandler,
    CreateError
}