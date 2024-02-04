

const mongoose= require("mongoose");

const facultySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    link:{
        type:String,
    },
    currentRank:{
        type:String,
        required:true,
    },
    startDate:{
        type:String,
        trim:true
    },
    teaching:{
        type:Number,
        default: 0
    },
    research:{
        type:Number,
        default: 0
    },
    service:{
        type:Number,
        default: 0
    },
    notes:{
        type:String,
    },
});

module.exports=mongoose.model("FacultyModel", facultySchema);