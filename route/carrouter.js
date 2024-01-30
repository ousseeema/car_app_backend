const express = require('express');
const router = express.Router();
const{getAllCars, getcar, updateCar, deleteCar}=require('../controller/carContoller');
const {loggedin}= require('../middleware/logedin')
Router.route('/cars').get(loggedin,getAllCars);
Router.route('/cars/:id').get(loggedin,getcar);
Router.route('/cars/:id').put(loggedin,updateCar);
Router.route('/cars/:id').delete(loggedin,deleteCar);




module.exports=router;
