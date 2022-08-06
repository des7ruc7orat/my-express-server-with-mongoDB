const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        minLength:3
    },
    password:{
        type:String,
        required:true,
        minlength:3
    },
    role:{
        type:String
    },
    createdFigures:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Figure'
        }
    ]
});


const User = mongoose.model('User',userSchema);

module.exports = User;