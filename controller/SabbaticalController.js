

const sabbaticalModel= require("../models/SabbaticalModel");


exports.sabbaticalController= async (req, res)  =>{

    try{

        // const {name, date, academicYear}= req.body;

        

        // const entry= await sabbaticalModel.create({name, date, academicYear});


        const data= await sabbaticalModel.find();


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
