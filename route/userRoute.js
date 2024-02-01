const express = require('express');


const Router = express.Router();



const {createUser}= require('../controller/userController');


Router.route('/CreateUser').post(createUser);