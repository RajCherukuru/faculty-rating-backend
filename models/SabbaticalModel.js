

const mongoose= require("mongoose");

const sabbaticalSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    startDate:{
        type:String,
    },
    endDate:{
        type:String,
    },
    currentRank:{
        type:String,
    },
    academicYear:{
        type:String,
    }
});

module.exports=mongoose.model("sabbaticalModel", sabbaticalSchema);