
const bcrypt= require("bcrypt");
const crypto = require("crypto")

const signUpModel= require("../models/signupModel");
const FacultyModel= require("../models/FacultyModel")

require("dotenv").config();

const jwt=require("jsonwebtoken");
const mailSender = require("../mailSender");






exports.resetPasswordToken = async(req, res) =>{
    try {
        const email = req.body.email
        const user = await signUpModel.findOne({ email: email })
        if (!user) {
          return res.json({
            success: false,
            message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
          })
        }
        const token = crypto.randomBytes(20).toString("hex")
    
        const updatedDetails = await signUpModel.findOneAndUpdate(
          { email: email },
          {
            token: token,
            resetPasswordExpires: Date.now() + 3600000,
          },
          { new: true }
        )
        console.log("DETAILS", updatedDetails)
    
        const url = `http://localhost:3000/update-password/${token}`
        // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`
    
        await mailSender(
          email,
          "Password Reset",
          `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
    
        res.json({
          success: true,
          message:
            "Email Sent Successfully, Please Check Your Email to Continue Further",
        })
      } catch (error) {
        return res.json({
          error: error.message,
          success: false,
          message: `Some Error in Sending the Reset Message`,
        })
      }



}





exports.resetPassword = async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body
  
      if (confirmPassword !== password) {
        return res.json({
          success: false,
          message: "Password and Confirm Password Does not Match",
        })
      }

      console.log("are we insdide the rest password fucntion")
      const userDetails = await signUpModel.findOne({ token: token })
      if (!userDetails) {
        return res.json({
          success: false,
          message: "Token is Invalid",
        })
      }
      console.log("did we find the user of the token")
      console.log(userDetails)


    //   if (!(userDetails.resetPasswordExpires > Date.now())) {
    //     return res.status(403).json({
    //       success: false,
    //       message: `Token is Expired, Please Regenerate Your Token`,
    //     })
    //   }

      console.log("are we able to check resetpoasswrod expires")
      const encryptedPassword = await bcrypt.hash(password, 10)
      await signUpModel.findOneAndUpdate(
        { token: token },
        { password: encryptedPassword },
        { new: true }
      )
      res.json({
        success: true,
        message: `Password Reset Successful`,
      })
    } catch (error) {
      return res.json({
        error: error.message,
        success: false,
        message: `Some Error in Updating the Password`,
      })
    }
  }
  










exports.signup= async (req, res)  =>{

    try{


        // const response =await FacultyModel.updateMany({currentRank: "Assistant Professors "}, {$set:{ currentRank: "Assistant Professor"}}, {new:true})
        // console.log(response)

        

        const {name, email, currentRank, password, role}=req.body;
        // let name=""
        console.log("the name from frontend is", name );

        // console.log("did we even enter there")
        // console.log(staffName)

        // if(staffName){
        //     name=staffName
        // }
        // else{
        //     name=facultyName
        // }

        console.log("hello")
        console.log("this is the name we recived", name)


        const firstName= name.split(' ')[0];
        const lastName= name.split(' ')[1];


        console.log(`${firstName} ${lastName}`)

        const existingUser= await signUpModel.findOne({email});

       console.log("are we here")

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }

        try{
            hashedPassword= await bcrypt.hash(password, 10);

        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"password couldnt be hashed"
            })
        }
        
        const entry= await signUpModel.create({
            firstName, lastName, email, currentRank, password:hashedPassword, role
        })

        console.log("we reached the end of the signup")

        return res.status(200).json({
            success:true,
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




exports.login= async (req, res) =>{


    try{

        const {email, password}= req.body; 

        console.log(" we are insdide login")

        if(!email || !password){

            return res.status(400).json({
                success:false,
                message:"incomplete fields"
            })
        }

        console.log(email)

        
        let dbuser= await signUpModel.findOne({email});
        if(!dbuser){
            return res.status(401).json({
            success:false,
            message:"user not present"
        })

        }
        
       


        if(await bcrypt.compare(password, dbuser.password)){

            const payload={
                firstName: dbuser.firstName,
                lastName:dbuser.lastName,
                email: dbuser.email,
                id: dbuser._id,
                role: dbuser.role
            }

            let token= jwt.sign(payload, 

                process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                })

                dbuser=dbuser.toObject();
            dbuser.token=token;
            dbuser.password=undefined;
            console.log("cookie is created")

            const options={
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                sameSite: "None",
                secure: true
                
            }
            console.log(dbuser)
            return res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                dbuser,
                message:"logged in successfullyr"
            });


        }
        else{
            return res.status(403).json({
                success:false,
                message:"password incorrect"
            })
        }

    }

    catch(err){

        console.log("error occured in login");

        return res.status(500).json({
            success:false,
            message:"issue in fetching login details."
        })
    }




}