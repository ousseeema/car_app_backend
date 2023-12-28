const express = require('express');
 const router = express.Router();



 router.route("/login").get();
 router.route("/register").post();



 module.exports = router; 