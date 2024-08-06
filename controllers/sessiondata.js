const sessiondata=(req,res,next)=>{
    req.sessionData=req.session;
    next();
}
module.exports=sessiondata;