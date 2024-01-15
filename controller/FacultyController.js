

const FacultyModel= require("../models/FacultyModel");


exports.facultyController = async (req, res)  =>{

    try{

        // const {name, currentRank, startDate, teaching, research, service, notes}= req.body;

        // const entry= await FacultyModel.create({name, currentRank, startDate, teaching, research, service, notes});

        const data= await FacultyModel.find({}).sort({currentRank:1, name:1});


        return res.status(200).json({
            success:true,
            body:data,
            message:"entry created "
        })


    }

    catch(err){

        return res.status(500).json({
            success:false,
            message:"user cannot be created"
        })

    }



}
