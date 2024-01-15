

const jwt= require("jsonwebtoken");
require("dotenv").config();




exports.auth = (req, res, next) =>{

    try{

        console.log("are we not crossing auth")
        

        const token= req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(token)
        console.log("above is the token")


        if(!token){

            return res.status(401).json({
                sucess:false,
                message:"token missing"
            })
        }

        try{
            const payload= jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user=payload;
        }
        catch(err){
            res.status(401).json({
                sucess:false,
                message:"token is invalid"
            })
        }
        next();



    }

    catch(err){
 
        return res.status(500).json({
            sucess:false,
            message:"something went wrong"
        })

    }
}



















exports.committee = (req, res, next) =>{

    try{

        if(req.user.role != "Committee"){
            return res.status(401).json({
                sucess: false,
                message:" this is protected route for committee"
            })
        }
        next();

    }

    catch(err){

        return res.status(500).json({
            sucess:false,
            message:"your role is not matching"
        })

    }
}
















exports.nonCommittee = (req, res, next) =>{

    try{

        if(req.user.role != "Staff"){
            return res.status(401).json({
                sucess: false,
                message:" this is protected route for staff"
            })
        }
        next();

    }

    catch(err){

        return res.status(500).json({
            sucess:false,
            message:"your role is not matching"
        })

    }
}





























exports.isAdmin = (req, res, next) =>{

    try{

        console.log("we are at admin")


        if(req.user.role != "Admin"){
            return res.status(401).json({
                sucess: false,
                message:" this is protected route for admins"
            })
        }

        console.log("verified that it is admin")
        next();

    }

    catch(err){

        return res.status(500).json({
            sucess:false,
            message:"your role is not matching"
        })

    }
}