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
// only if you are admin
//private 
exports.updateCar =asynchandler(async(req, res, next)=>{
   

  if(req.user.role != "admin"){
    return res.status(401).send({
      success: false ,
      message: "You are not authorized to access this route or update details",
    });
  }
  const updatedetails = req.body;

  const id = req.params.id;
  if(!updatedetails){
    return res.status(400).send({
      message: "please enter details to update",
      success: false ,
      data:[],
    });
  }

  const updatedcar = await carmodel.findByIdAndUpdate(id, updatedetails, {
    new: true,
    runValidators: true,
  });


   if (!updatedcar){
      return res.status(404).send({
        message: "No car found with that id",
        success: false,
      });

   }

   return res.status(200).send({
    message: "Car updated successfully",
    success: true,
    data: updatedcar,
   });


})