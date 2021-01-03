const mongoose = require('mongoose')
//  trim: true,// to ignore spaces

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is Required']
    },
    phoneNumber:{
        type:String,
        trim: true,
        required: [true, 'Phone is Required']
    },
    dateJoined:{
        type: Date,
        default: Date.now(),
    },
    feeAmount:{
        type:Number,
        default: 1500,
    },
    feeStatus:{
        type:Boolean,
        default:true
    }
})
module.exports = mongoose.model('User', UserSchema)