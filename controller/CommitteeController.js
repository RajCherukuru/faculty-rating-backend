

const committeeMembers= require("../models/CommitteeModel");


exports.committeeController= async (req, res)  =>{

    try{

        // const {name, email, currentRank, academicYear}= req.body;

        // const entry= await committeeMembers.create({name, email, currentRank, academicYear});

        const data= await committeeMembers.find();


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
