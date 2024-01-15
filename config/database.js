


const mongoose = require("mongoose");

require("dotenv").config();


exports.connect= ()=>{

    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>{console.log("database is successfully connected")})
    .catch((err) =>{
        console.log("database is failed in  connected")
        process.exit(1);
    });
}

