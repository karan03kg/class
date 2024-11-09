function CreateError(status,message){
    let error = new Error();
    error.status = status;  //status code
    error.message = message;  //message for res.send
    return error;
}

// function ErrorHandler(err,req,res,next){
//     if(err.status){
//         res.status(err.status);  
//         res.send(err.message);
//     }
//     else{
//         res.status = 500;
//         res.send("Internel server error")
//     }
// }

function ErrorHandler(err, req, res, next) {
    console.log(err.status);
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    res.status(statusCode);
    res.send(message);
    
}

module.exports = {
    CreateError,
    ErrorHandler
}