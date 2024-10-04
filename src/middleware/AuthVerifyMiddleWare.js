const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    let token = req.headers["token"]
    jwt.verify(token,"suhu123",(err,decoded)=>{
        if(err){
        return res.status(401).json({status:"fail", message:"unauthorized"});
        }
        else{
            let email = decoded.data;
            req.headers.email = email;
            next();
        }
    })
}