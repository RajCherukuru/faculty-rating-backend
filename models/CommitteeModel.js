

const mongoose= require("mongoose");

const committeeSchema= new mongoose.Schema({
    name:{
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
    academicYear:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("committeeMembers", committeeSchema);