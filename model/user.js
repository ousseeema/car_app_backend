const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");
const crypto = require('crypto');
const usermodel = mongoose.Schema({

   name :{
    type : String,
    trim : true , 
    required : [true , " Please enter your email address"],
    maxlength : [100, " Maximum length of the name is 100 characters"], 
    minlength :[6, " Minimum  length of the name is 6 characters"],

   }, 

   email : {
    type : String,
    unique : [true , "email is already taken"], 
    required : [true , " Please enter your email address"],
     maxlength : [100, " Maximum length of the email is 100 characters"],
     minlength :[6, " Minimum length of the email 6 characters"], 
     match : [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      " Please enter a valid email address",
     ],
     trim : true 
   },
    

   password : {
    type :String , 
    maxlength : [100 , "Maximum length of the password is 100 characters"],
     minlength :[6, " Minimum length of the password is 6 characters"],
     trim : true ,
     select : false , 


  },
   photo : {
    type : String ,
    default : "No-Photo.png",
  },
   role :{
    type : String , 
     default : "user",
     enum : [
      "user", 
      "agence owner",
      "admin"
     ], 
     trim : true ,
   },
   createdAt : {
    type : Date , 
    default : Date.now()

   },
   resetToken : String ,
   dateResetToken : Date , 
});
usermodel.methods.sign = function(){
  return Jwt.sign({id: this._id} ,"sioussema", {expiresIn:"30d"})
 }

 usermodel.methods.compare = async function(password){
 
  return await bcrypt.compare(password , this.password);
  
}
usermodel.pre("save",async function  (next) {
  if(!this.isModified("password")){
    next();
  }
 const  sltgen = await bcrypt.genSalt(20);
 const hashpass = await  bcrypt.hash(this.password, sltgen
  );
  this.password = hashpass; 
}) ;

usermodel.methods.resettoken =async function(){
  const resetToken1 = await crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(resetToken1).digest("hex");
  this.dateResetToken = Date.now() + 10 * (60 * 1000);
  return resetToken1;
}





module.exports  = mongoose.model("users", usermodel);