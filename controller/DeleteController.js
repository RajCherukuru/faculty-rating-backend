

const committeeModel= require("../models/CommitteeModel");
const assignmentModel= require("../models/AssignmentModel");
const FacultyModel = require("../models/FacultyModel");
const SabbaticalModel = require("../models/SabbaticalModel");





exports.deleteCommittee= async (req, res) =>{

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
    
        await committeeModel.findByIdAndDelete({_id:id})
    
        return res.status(200).json({
            status:true,
            message:"deleted data",
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in deleting",
            
        })
    
    }
    
    }




exports.deleteAssignment= async (req, res) =>{


    // await assignmentModel.updateMany({name:"Sik-Sang Yau"}, {$set: {name:"Stephen S. Yau"}})

    // try {
    //     // Fetch all assignments
    //     const assignments = await assignmentModel.find({currentRank: "Professor"});

    //     const formatName = (name) => {
    //         // Split the name by comma
    //         const parts = name.split(',');
          
    //         // Ensure there are at least two parts
    //         if (parts.length >= 2) {
    //           // Trim each part and rearrange to "firstname lastname" format
    //           return `${parts[1].trim()} ${parts[0].trim()}`;
    //         }
          
    //         // Return the original name if it couldn't be formatted
    //         return name;
    //       };
    
    //     // Update each assignment with formatted names
    //     for (const assignment of assignments) {
    //       assignment.name = formatName(assignment.name);
    //       await assignment.save();
    //     }
    
    //     console.log("Names formatted successfully");
    //   } catch (error) {
    //     console.error("Error updating names:", error);
    //   }
    
    
    
    
    


    try{

        await assignmentModel.updateMany({currentRank: 'Research Professor'}, {$set: {currentRank: "Research Faculty"}})
        
    }catch(err){
        console.log(err)
    }

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

    await assignmentModel.findByIdAndDelete({_id:id})

    return res.status(200).json({
        status:true,
        message:"deleted data",
    })


}catch(err){
    return res.status(500).json({
        status:false,
        message:"error in deleting",
        
    })

}

}




exports.deleteFaculty= async (req, res) =>{


    // try{

    //     await FacultyModel.updateMany({service: 'N/A'}, {$set: {service: 0}})
        
    // }catch(err){
    //     console.log(err)
    // }

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
        const facultyToDelete = await FacultyModel.findById({_id: id});
const {name}= facultyToDelete;

        await FacultyModel.findByIdAndDelete({_id:id})

        await assignmentModel.deleteMany({name});

    
        return res.status(200).json({
            status:true,
            message:"deleted data",
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in deleting",
            
        })
    
    }
    
    }







exports.deleteSabbatical= async (req, res) =>{

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
    
        await SabbaticalModel.findByIdAndDelete({_id:id})
    
        return res.status(200).json({
            status:true,
            message:"deleted data",
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in deleting",
            
        })
    
    }
    
    }