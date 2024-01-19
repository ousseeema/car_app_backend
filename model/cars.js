const mongoose = require('mongoose');



const car = mongoose.Schema({
 
  carname :{
    type : String ,
    require : [true, "car name must not be empty"],
    minlength : [4, 'min length must be 4'],
    maxlength : [20, 'max length must be 20'],
    trim : true ,
    unique : false , 


  },
  cartype :{
    type : String , 
    require : [true  , ' Please enter car type'],
    trim : true,
    minlength :[2, 'Min length must be 3'],
  maxlength :[14, 'Max length must be 14'],

  },
  cardetails :{
    type: String , 
    require : [true , 'Please enter car details'],
    trim : true ,
    minlength : [40 , 'Min length must be 10'],
    maxlength :[300, "Max length must be 300"],

  },

  carRating :{
    type : Number ,
    default : 0.0 ,
    max: [5 , 'Max rating is 5'],
    min : [0 , 'Min rating is 0'],

  },

  carOwner :{
    type : mongoose.Schema.ObjectId ,
    ref : 'user',
    require : true ,

  },

  agenceemail :{
    type : mongoose.Schema.ObjectId, 
    ref : 'agence',
    require : true ,
  },
  agenceLocation :{
    type : String ,
    require : [true , 'Please enter agence location'],
    trim : true ,
    minlength : [4 , 'Min length must be 4'],
    maxlength : [30 , 'Max length must be 30'],

  },
  agencephone :{
   type : Number , 
    require : [true , 'Please enter agence phone'],
    trim : true ,
    

  },
  alavaibleDate:{
       type : Date, 
        require : [true , 'Please enter agence alavaibleDate'],
        trim : true ,
  },

  agenceemail :{
    type : String , 
    require : [true , 'Please enter agence email'],
    trim : true ,
    unique : true ,
    match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , 'Please enter valid email'],
  

  }






  
});






module.exports = mongoose.model('car', car);