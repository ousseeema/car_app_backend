 const express = require('express');
 const app = express();
 const auth = require('./controller/authCon');






 
 app.use("api/v0/users", auth );
  

 





 app.listen(1111, () => {
  console.log('App listening on port 1111!');
 });
