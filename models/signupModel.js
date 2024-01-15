
const mongoose= require("mongoose");

const signupSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    currentRank:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enu:["Admin", "Committee", "Non-committee"]
    },
    token: {
        type: String,
      },
})

module.exports=mongoose.model("signUpModel", signupSchema);