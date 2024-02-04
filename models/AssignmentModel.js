

const mongoose= require("mongoose");

const assignmentSchema= new mongoose.Schema({
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
        trim:true
    },
    startingAsu:{
        type:String,
        required:true,
        trim:true
    },
    teaching:{
        type:Number,
        required:true,
    },
    research:{
        type:Number,
        required:true,
    },
    service:{
        type:Number,
        required:true,
    },
    studentEvaluation:{
        type:Number,
        default: 0
    },
    course:{
        type:Number,
        default: 0
    },
    teachingStudentMentor:{
        type:Number,
        default: 0
    },
    notes:{
        type:String,
        trim:true
    },
    overall:{
        type:Number,
        default: 0
    },
    publications:{
        type:Number,
        default: 0
    },
    researchFunding:{
        type:Number,
        default: 0
    },
    researchStudentMentor:{
        type:Number,
        default: 0
    },
    notes2:{
        type:String,
        trim:true
    },
    overall2:{
        type:Number,
        default: 0
    },
    internal:{
        type:Number,
        default: 0
    },
    external:{
        type:Number,
        default: 0
    },
    notes3:{
        type:String,
        trim:true
    },
    overall3:{
        type:Number,
        default: 0
    },
    weightedTotal:{
        type:Number,
        default: 0
    },
    assignment:{
        type:String,
    },
    averageWeightedTotal:{
        type:Number,
        default: 0
    },
    color:{
        type:Number,
        default:0
    }
    
    
});




module.exports=mongoose.model("assignmentModel", assignmentSchema);