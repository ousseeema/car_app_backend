const usermodel = require('../model/user');


const asyncHandler = require("../middleware/asynchandler");

exports.createUser = asyncHandler(async (req, res, next) => {


   
  if(req.user.role != "admin"){
    return res.status(401).send({
      message : 'you are not authorized to create user',
      success: false,
      data: null
    })
  }
  const user = await usermodel.create(req.body,{
    runvalidators:true,
   });
   if(!user){
    return res.status(403).send({
      message : 'user not created',
      success: false,
      data: null
    })
   }

   return res.status(200).send({
    success: true,
    message :" user has been created successfully",
    data :user
   });
});