const carmodel = require('../model/cars');
const asynchandler = require('../middleware/asynchandler')

//publc 
// get all cars in data base 
exports.getAllCars = asynchandler(async(req, res, next)=>{
  const cars = await carmodel.find();
  if(!cars){
   return res.status(404).send({
      message : 'No cars found',
      success : false
    })
  }

  return res.status(200).send({
    message : 'All cars',
    success : true,
    data : cars
  
  })

});

exports.getcar = asynchandler(async(req, res, next)=>{




  
})