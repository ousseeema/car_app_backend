const mongoose = require('mongoose');



const car = mongoose.Schema({
 
  carname :{


  },
  cartype :{

  },
  cardetails :{
    


  },

  carRating :{

  },

  carOwner :{

  },

  agenceemail :{

  },
  agenceLocation :{

  },
  agencephone :{



  },
  alavaibleDate:{
       
  }






  
});




module.exports = mongoose.model('car', car);