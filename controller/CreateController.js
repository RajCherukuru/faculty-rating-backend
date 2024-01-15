

const committeeModel= require("../models/CommitteeModel");
const assignmentModel= require("../models/AssignmentModel");
const FacultyModel = require("../models/FacultyModel");
const SabbaticalModel = require("../models/SabbaticalModel");





exports.createCommittee= async (req, res) =>{

    try{
    
        const {name, email, rank, year}= req.body;
        console.log(name);
    
        if(!name || !email || !rank || !year){
            return res.status(500).json({
                status:false,
                message:"All fields are necessary"
            })
        }
    
        const existingUser= await committeeModel.findOne({email});
    
        if(existingUser){
            return res.status(500).json({
                status:false,
                message:"Already user with this email is present"
            })
        }
    
        await committeeModel.create({name, email, currentRank:rank, academicYear:year});
    
        return res.status(200).json({
            status:true,
            message:"new assignment has been created"
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in creating a new user"
        })
    
    }
    
    }

    // {
    
    //     "name":"ahmed adil",
    //     "currentRank":"Asst Professor",
    //     "startingAsu ":"8/16/22",
    //     "teaching":"0",
    //     "research":"0",
    //     "service":"0",
    //     "studentEvaluation":"3",
    //     "course":"4",
    //     "teachingStudentMentor":"2",
    //     "notes":"dfsfasdfs",
    //     "overall":"",
    //     "publications":"3",
    //     "researchFunding":"3",
    //     "researchStudentMentor":"3",
    //     "notes2":"ahmed adil",
    //     "overall2":"",
    //     "internal":"4",
    //     "external":"4",
    //     "notes3":"ahmed adil",
    //     "overall3":"",
    //     "weightedTotal":"5",
    //     "assignment":"chittal Baral"
    // }

    // {
    
    //     "name":"ahmed adil",
    //     "currentRank":"Asst Professor",
    //     "startingAsu ":"8/16/22",
    //     "teaching":0,
    //     "research":0,
    //     "service":0,
    //     "studentEvaluation":3,
    //     "course":4,
    //     "teachingStudentMentor":2,
    //     "notes":"dfsfasdfs",
    //     "overall":3,
    //     "publications":3,
    //     "researchFunding":3,
    //     "researchStudentMentor":3,
    //     "notes2":"ahmed adil",
    //     "overall2":4,
    //     "internal":4,
    //     "external":4,
    //     "notes3":"ahmed adil",
    //     "overall3":4,
    //     "weightedTotal":5,
    //     "assignment":"chittal Baral"
    // }



exports.createAssignment= async (req, res) =>{

try{

    const {name, currentRank, startingAsu, teaching, research, service, studentEvaluation, course, teachingStudentMentor, 
        notes, overall, publications, researchFunding, researchStudentMentor, notes2, overall2, internal, external, notes3, overall3, weightedTotal, assignment}= req.body;

    console.log(name);

    await assignmentModel.create({name, currentRank, startingAsu, teaching, research, service, studentEvaluation, course, teachingStudentMentor, 
        notes, overall, publications, researchFunding, researchStudentMentor, notes2, overall2, internal, external, notes3, overall3, weightedTotal, assignment});

        console.log("did we create basic")

    return res.status(200).json({
        status:true,
        message:"new assignment has been created"
    })


}catch(err){
    return res.status(500).json({
        status:false,
        message:"error in creating a new user"
    })

}

}







exports.createFaculty= async (req, res) =>{

    try{
    
        const { name, date, rank, teaching, research, service}= req.body;
        console.log(name);
    
        if(!name || !rank){
            return res.status(500).json({
                status:false,
                message:"All fields are necessary"
            })
        }
    
        const existingUser= await FacultyModel.findOne({name});
    
        if(existingUser){
            return res.status(500).json({
                status:false,
                message:"Already user with this email is present"
            })
        }
    
        await FacultyModel.create({name, startDate:date, currentRank:rank, teaching, research, service});

        for (let i = 0; i < 3; i++) {
            await assignmentModel.create({
              name,
              startingAsu: date,
              currentRank: rank,
              teaching,
              research,
              service
            });
          }

        console.log("we have creating a new entry")
    
        return res.status(200).json({
            status:true,
            message:"new assignment has been created"
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in creating a new user"
        })
    
    }
    
    }
















exports.createSabbatical= async (req, res) =>{

    try{
    
        const { name, startDate,
            endDate,
            currentRank}= req.body;
        console.log(name);
    
        if(!name){
            return res.status(500).json({
                status:false,
                message:"All fields are necessary"
            })
        }
    
        const existingUser= await SabbaticalModel.findOne({name});
    
        if(existingUser){
            return res.status(500).json({
                status:false,
                message:"Already user with this email is present"
            })
        }
    
        await SabbaticalModel.create({name, startDate,
            endDate,
            currentRank});

        console.log("we have creating a new sabbatical entry")
    
        return res.status(200).json({
            status:true,
            message:"new assignment has been created"
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in creating a new user"
        })
    
    }
    
    }
