const mongoose = require('mongoose');


const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required:true,
        
      },

      price:{
        type:Number,
        trim:true,
        required:true
    },
    category: {
        type: ObjectId,
        ref:'Category',
        required:true
      },
    quantity:{
        type: Number
    },
    photo:{
        type: 'String',
		required: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    shipping:{
        required:false,
        type:Boolean
    },
    rating: {
        type: Number,
        
    },
    
}, { timestamps: true})


module.exports = mongoose.model('Product', productSchema)