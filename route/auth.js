const express = require('express');
 const router = express.Router();
  const { register} = require('../controller/authCon')


 router.route("/login").get();
 router.route("/register").post(register);



 module.exports = router; 