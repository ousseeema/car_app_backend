 const express = require('express');
 const app = express();
 const colors = require('colors');
 const auth = require('./route/auth');






 
 app.use("api/v0/users", auth );
  

 





app.listen(1111, () => {
console.log('App listening on port 1111!'.bgBlue);
});



