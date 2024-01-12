const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asynchandler");
const usermodel= require('../model/user');
 
exports.loggedin = asyncHandler(async(req, res, next)=>{
  let token;
   if(req.headers.authorization || req.headers.authorization.startWith('Bearer')){
    
    token = req.headers.authorization.split(" ")[1]
   }
   if(!token){
    return res.status(403).send({
      message : "Invalid token",
      success : false

    });


   }

  
   const userid = jwt.verify(token, "sioussema");

   if(!userid){
    return res.status(403).send({
      message : "You are not authorized",
      success : false
    })
   }

   const user = await usermodel.findById(userid.id);

   if(!user){ 
    return res.status(403).send({
      message:"notfound",
      success : false
    });
   }

          
   req.user = user;
   next();

  
});
