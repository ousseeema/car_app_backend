const mongoose = require('mongoose');


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
module.exports  = mongoose.model("users", user);