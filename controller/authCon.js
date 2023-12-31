const asynchanddler = require("../middleware/asynchandler");
const usermodel = require("../model/user");

const emailTrapper= require("../utils/emailTraper")
const crypto =require('crypto')


// ?   register user with email and password 
exports.register =asynchanddler(async (req, res, next )=> {
 
   
     const {email, password , role , name  } = req.body ; 

      let user = await usermodel.findOne({
        email : email 
      }); 


   if (!user){
    return res.status(400).send({
      message : "user already existed in the application try another email",
      success : false, 
      data :[]
    });
   }


   user = await usermodel.create({
    email: email , 
    name: name , 
    password : password , 
    role: role 
   }); 


   if (!user){
    return res.status(404).send({
      success : false , 
      message : "error while registering", 
      data :[],
    });
   }

   const token  = await user.jwt() ;

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
  

   const verifiePass = user.comapre(password);
   


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


    
  try {
    const resetToken =  await user.resettoken();
    await user.save({validateBeforeSave:false});
   const  options = {
    emailto : user.email,
    text: `here is the token to reset your password ${resetToken}`,
    subject : "Your reset token"
   }

    await emailTrapper(options); 
    
    
  } catch (err) {
    user.resetToken=undefined;
    user.dateResetToken= undefined;
    user.save({validateBeforeSave: false});

    
  }





});

exports.resetPasswod = asynchanddler(async(req, res, next)=>{
  const {resettooken , newpassword}=req.body;
 const  decoderesettoken = crypto.createHash("sha256").update(newpassword).digest("hex")

})

