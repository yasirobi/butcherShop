const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
       
        maxLength: 32,
        trim:true,
       
    },
    desc: {
        type: String,
        maxLength: 2000
      },
   
    photo:{
        type: 'String',
		
    },
   
    
    
}, { timestamps: true})


module.exports = mongoose.model('Blog', blogSchema)