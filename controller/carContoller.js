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


// gettting a single car frpm data base 
// private
exports.getcar = asynchandler(async(req, res, next)=>{

const id= req.params.id;


if (!id) {
  return res.status(400).send({
    message: 'No car id provided',
    success: false
  })
}


   const car = await carmodel.findById(id);
   if(!car){
    return res.status(404).send({
      message : 'No car found',
      success : false
    })
   }


   return res.status(200).send({
    message: 'Car found',
    data : car,
    success: true 
   })


  
})


// uploaing a car
//private 