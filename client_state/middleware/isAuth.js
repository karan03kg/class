const isAuth = (req,res,next)=>{
    if(req.session.user){
        res.send(`${req.session.user.email} is logged in`);
    }
    else{
        next();
        // res.redirect("/user/login");
    }
}

module.exports = isAuth