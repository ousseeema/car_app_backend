const asynchanddler = require("../middleware/asynchandler");
const usermodel = require('../model/user')

const emailTrapper= require('../utils/emailTraper')
const crypto =require('crypto')
  

// ?   register user with email and password 
exports.register =asynchanddler(async (req, res, next )=> {
 
   
     const {email, password , role , name  } = req.body ; 
   const user = await usermodel.findOne({email:email});
    if (user){
      return res.status(400).send({
        message: "User already registered",
        success: false ,
        data:[]
      })
    }




    const user1 = await usermodel.create({email:email, 
    password:password , 
    role:role , 
    name:name}) ; 
    if(!user1){
      return res.status(400).send({
        message: "Error creating user",
        success: false ,
        data:[]
      })
      
    }
    
  

   const token  =  user1.sign();

   res.status(200).send({
    success : true , 
   message : "you have been registered successfully",
   token : token
   });
});


 // ?   this function will verifie the user that's already registered or not 
 // * if true log in 
 // ! else message error 
exports.login = asynchanddler(async(req, res , next )=>{

  const{  
    email, 
    password
  }  = req.body;

  if(!email || !password){
    return res.status(400).send({
      success : false , 
      message: "invalid credintiels",
      data : []
    });
  }


   const user = await usermodel.findOne({
    email: email 
   }).select("+password");


   if(!user){
    return res.status(400).send({
      success : false , 
      message: "invalid credintiels",
      data : []
    });
   }
  

   const verifiePass = user.compare(password);
   


   if(!verifiePass){
    return res.status(400).send({
      success : false , 
      message :"error in credintiels",
      data : []
    });
   }



   const token = await user.sign();

   return res.status(400).send({
    success : true  , 
    message :"token is here",
    token : token
  });
});


exports.resetToken = asynchanddler(async (req, res, next )=>{
  const { email } = req.body;

  if(!email){
    return res.status(400).send({
      success : false , 
      message :"please enter your email",
      data : []
    });
  }

  let user = await usermodel.findOne({email:email});


  if (!user)
{
  return res.status(404).send({
    success : false, 
    message:'no such user found ',
    data:[]
  })
}

const resetToken =  await user.resettoken();
    await user.save({validateBeforeSave:false});
   const  options = {
    emailto : user.email,
    text: `here is the token to reset your password ${resetToken}`,
    subject : `THE RESET TOKEN IS  ${resetToken}`
   }
    
  try {
    

    await emailTrapper(options); 
    res.status(200).send( {
      message : "Your reset token has been sended to youb email",
      success : true ,
      data : []
    })
    
    
  } catch (err) {
    user.resetToken=undefined;
    user.dateResetToken= undefined;
    user.save({validateBeforeSave: false});
    res.status(404).send({
      success : false, 
      message:'email could not be sent , please try again later',
      data:[]
    })

    
  }





});

exports.resetPasswod = asynchanddler(async(req, res, next)=>{
  const {resettooken , newpassword}=req.body;
  const  decoderesettoken = crypto.createHash("sha256").update(resettooken).digest("hex")
  
  const user = await usermodel.findOne({
     resettooken : decoderesettoken,
      dateResetToken : {$gt : Date.now()}                                                          
  });
  if(!user){
    return res.status(404).send({
      success : false, 
      message:'no such user found ',
      data:[]
    });
  }



 try {
  user.password = newpassword ;
  
  user.resetToken = undefined ;
  user.dateResetToken = undefined ;
  user.save({validateBeforeSave:true});
  res.status(200).send({
    success : true, 
    message:'password reset successfully',
    data:[]
  });
  
 } catch (err) {
  res.status(404).send({
    success : false, 
    message:'error in reseting password',
    data:[]
  });
 }




  










})

