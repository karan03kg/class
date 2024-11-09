function unexpected(req,res,next){
    let route = req.url;
    res.status(404);
    res.send(`${route} Not Found`);
    // next();
}

module.exports = unexpected;