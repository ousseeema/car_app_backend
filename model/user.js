const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");
const crypto = require('crypto');
const user = mongoose.Schema({

   fullname :{
    type : 'string',
    trim : true , 
    required : [true , " Please enter your full name"] ,
    maxlength : [100, " Maximum length of the name is 100 characters"], 
    minlength :[6, " Minimum  length of the name is 6 characters"],

   }, 

   email : {
    type : 'string',
    unique : true , 
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
user.methods.sign = function(){
  return Jwt.sign({id: this._id} ,"sioussema", {expiresIn:"30d"})
 }

user.methods.compare = async function(password){
 
  return await bcrypt.compare(password , this.password);
  
}
user.pre("save", function (next) {
  if(!this.isModified("password")){
    next();
  }
 const  sltgen = bcrypt.genSalt(20);
 const hashpass = bcrypt.hash(this.password, sltgen
  );
  this.password = hashpass; 
}) ;

user.methods.resettoken =async function(){
  const resetToken1 = await crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.dateResetToken = Date.now() + 10 * (60 * 1000);
  return resetToken1;
}





module.exports  = mongoose.model("users", user);