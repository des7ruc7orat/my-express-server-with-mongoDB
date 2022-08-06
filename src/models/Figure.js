const mongoose = require('mongoose');

///^https?/g

const FigureSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4
    },
    secondName:{
        type:String,
        minlength:4
    },
    familyName:{
        type:String,
        required:true,
        minlength:4
    },
    yearBorn:{
        type:Number,
        required:true
    },
    yearDied:{
        type:Number,
        required:true
    },
    nickname:{
        type:String,
        required:false
    },

    imageUrl :{
        type:String,
        required:true,
        validate:{
            validator: /^(http|https)/i,
            message:'Image url shoud start with http/s!'
        }
        
    },
    occupation:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    likes:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ]
   
});


const  Figure = mongoose.model('Figure',FigureSchema);

module.exports = Figure;