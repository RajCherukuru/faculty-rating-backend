

const committeeModel= require("../models/CommitteeModel");
const assignmentModel= require("../models/AssignmentModel");
const FacultyModel = require("../models/FacultyModel");
const SabbaticalModel = require("../models/SabbaticalModel");




exports.getCommitteeFromId= async (req, res) =>{

try{

    const id= req.params.id;

    console.log("are we here")

    console.log(id)

    if(!id){
        return res.status(500).json({
            status:false,
            message:"id doenst exist"
        })
    }

    const value=await committeeModel.findById({_id:id})

    return res.status(200).json({
        status:true,
        message:"found data",
        value
    })


}catch(err){
    return res.status(500).json({
        status:false,
        message:"error in finding the data",
        
    })

}

}


exports.getAssignmentFromId= async (req, res) =>{

    try{
    
        const id= req.params.id;
    
        console.log("are we here")
    
        console.log(id)
    
        if(!id){
            return res.status(500).json({
                status:false,
                message:"id doenst exist"
            })
        }
    
        const value=await assignmentModel.findById({_id:id})
    
        return res.status(200).json({
            status:true,
            message:"found data",
            value
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in finding the data",
            
        })
    
    }
    
    }




exports.getFacultyFromId= async (req, res) =>{

    try{
    
        const id= req.params.id;
    
        console.log("are we here")
    
        console.log(id)
    
        if(!id){
            return res.status(500).json({
                status:false,
                message:"id doenst exist"
            })
        }
    
        const value=await FacultyModel.findById({_id:id})
    
        return res.status(200).json({
            status:true,
            message:"found data",
            value
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in finding the data",
            
        })
    
    }
    
    }






exports.getSabbaticalFromId= async (req, res) =>{

    try{
    
        const id= req.params.id;
    
        console.log("are we inside sabbatical id")
    
        console.log(id)
    
        if(!id){
            return res.status(500).json({
                status:false,
                message:"id doenst exist"
            })
        }
    
        const value=await SabbaticalModel.findById({_id:id})
    
        return res.status(200).json({
            status:true,
            message:"found data",
            value
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in finding the data",
            
        })
    
    }
    
    }