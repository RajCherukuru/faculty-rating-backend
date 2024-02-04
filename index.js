
const committeeMembers= require("./models/CommitteeModel");


const express= require("express");
const cors = require('cors');

const app=express();

// const corsOptions = {
//   origin: 'https://asufaculty.space', // Replace with your actual frontend domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
//   optionsSuccessStatus: 204, // Handle preflight requests
// };

// app.use(cors(corsOptions));
app.use(cors());





app.use(express.json());

require("dotenv").config();

const cookieParser= require("cookie-parser");
app.use(cookieParser());   

const PORT= process.env.PORT || 4000


require("./config/database").connect();




const user= require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, ()=>{
    console.log(`sucessfully started on port ${PORT}`)
})
