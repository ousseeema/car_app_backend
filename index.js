 const express = require('express');
 const app = express();
 const colors = require('colors');

  const connectDB = require("./utils/db")
 const errorHandler = require("./middleware/errorhandler");

app.use(express.json());
 connectDB();
 const auth = require('./route/auth');
 app.use("/api/v0/users", auth );
 
  






 app.use(errorHandler);





app.listen(1111, () => {
console.log('App listening on port 1111!'.bgBlue);
});



