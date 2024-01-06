const express = require('express');
 const router = express.Router();
  const { register, login, resetToken} = require('../controller/authCon')


 router.route("/login").get(login);
 router.route("/register").post(register);
 router.route("/resettoken").post(resetToken);



 module.exports = router; 