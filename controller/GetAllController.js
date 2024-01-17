

const assignmentModel= require("../models/AssignmentModel")
const FacultyModel= require("../models/FacultyModel");
const SabbaticalModel = require("../models/SabbaticalModel");


exports.getAllAssignmentController= async (req, res)  =>{

    try{

        // const {name, email, currentRank, academicYear}= req.body;

        // const entry= await committeeMembers.create({name, email, currentRank, academicYear});

        const value= await assignmentModel.find().sort({ currentRank: 1, name: 1 });


        return res.status(200).json({
            success:true,
            body:value,
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




exports.filterAssignmentController= async (req, res)  =>{

    try{

        
       

        const search= req.params.rank;
        console.log(search)

        const sabbatical= await SabbaticalModel.find({},{name:1});
        console.log("did we get sabbtial values")

        const sabbaticalNames = sabbatical.map(item => item.name);

        console.log("did we extract values",sabbaticalNames)

        const value = await assignmentModel.find({ currentRank: search, name: { $nin: sabbaticalNames } }).sort({ name: 1 });
        console.log("did we get assignmet values")


        // console.log(value)


        return res.status(200).json({
            success:true,
            body:value,
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









exports.filterEvaluationController= async (req, res)  =>{

    try{


        console.log("we are fetch evlautaoi controller")
        

        const firstName= req.user.firstName;
        const lastName= req.user.lastName;
        const search= req.params.rank;
        console.log(search)

        const prof= firstName + " " + lastName;

        console.log(prof)


        console.log(search)

        const sabbatical= await SabbaticalModel.find({},{name:1});
        console.log("did we get sabbtial values")

        const sabbaticalNames = sabbatical.map(item => item.name);


        const value = await assignmentModel.find({
            assignment: prof,
            currentRank: search, name:{$nin: sabbaticalNames}  // Assuming `search` is the value you want to filter by for `currentRank`
          }).sort({ name: 1 });


        // console.log(value)


        return res.status(200).json({
            success:true,
            body:value,
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














exports.filterFaculty= async (req, res)  =>{

  try{


      console.log("we are fetch faculty filterr")
      
      const search= req.params.rank;
      console.log(search)


      const value = await FacultyModel.find({
          currentRank: search  // Assuming `search` is the value you want to filter by for `currentRank`
        }).sort({ name: 1 });


      // console.log(value)


      return res.status(200).json({
          success:true,
          body:value,
          message:"filtered the faculty "
      })


  }

  catch(err){

      return res.status(500).json({
          success:false,
          message:"cannot filter faculty"
      })

  }



}























exports.filterAggregateController = async (req, res) => {
    try {
      const search = req.params.rank;
      console.log(search);

      const firstName= req.user.firstName;
      const lastName= req.user.lastName;

      const filter= `${lastName}, ${firstName}`;
      const filter2= `${lastName},${firstName}`;
      const filter3= `${firstName} ${lastName}`;

      console.log(filter)


      const sabbatical= await SabbaticalModel.find({},{name:1});
      console.log("did we get sabbtial values")

      const sabbaticalNames = sabbatical.map(item => item.name);


      
  
      const filters = [filter, filter2, filter3, ...sabbaticalNames]; // Add your desired filter values here
const value = await assignmentModel.find({ currentRank: search, name: { $nin: filters } })
  .sort({ averageWeightedTotal: -1, name: 1 });
    

  
      const processedData = [];
      const newData=[];
      
      
        let avgStudentEvaluation = 0;
        let avgCourse = 0;
        let avgTeachingStudentMentor = 0;
        let avgOverall = 0;
        let avgPublications = 0;
        let avgResearchFunding = 0;
        let avgResearchStudentMentor = 0;
        let avgOverall2 = 0;
        let avgInternal = 0;
        let avgExternal = 0;
        let avgOverall3 = 0;
        let avgWeightedTotal = 0;
        let avgAverageWeightedTotal = 0;
        let name;


      let count = 1;
  
      console.log("do we have avg value");
  
      value.forEach((row, index) => {


        avgStudentEvaluation += parseFloat(row.studentEvaluation);
        avgCourse += parseFloat(row.course);
        avgTeachingStudentMentor += parseFloat(row.teachingStudentMentor);
        avgOverall += parseFloat(row.overall);
        avgPublications += parseFloat(row.publications);
        avgResearchFunding += parseFloat(row.researchFunding);
        avgResearchStudentMentor += parseFloat(row.researchStudentMentor);
        avgOverall2 += parseFloat(row.overall2);
        avgInternal += parseFloat(row.internal);
        avgExternal += parseFloat(row.external);
        avgOverall3 += parseFloat(row.overall3);
        avgWeightedTotal += parseFloat(row.weightedTotal);
        avgAverageWeightedTotal += parseFloat(row.averageWeightedTotal);

        

        processedData.push(row);

        
  
        if (count === 3 ) {
          // Calculate average and add a new row
          
          avgStudentEvaluation = (avgStudentEvaluation / 3).toFixed(2);
          avgCourse = (avgCourse / 3).toFixed(2);
          avgTeachingStudentMentor = (avgTeachingStudentMentor / 3).toFixed(2);
          avgOverall = (avgOverall / 3).toFixed(2);
          avgPublications = (avgPublications / 3).toFixed(2);
          avgResearchFunding = (avgResearchFunding / 3).toFixed(2);
          avgResearchStudentMentor = (avgResearchStudentMentor / 3).toFixed(2);
          avgOverall2 = (avgOverall2 / 3).toFixed(2);
          avgInternal = (avgInternal / 3).toFixed(2);
          avgExternal = (avgExternal / 3).toFixed(2);
          avgOverall3 = (avgOverall3 / 3).toFixed(2);
          avgWeightedTotal = (avgWeightedTotal / 3).toFixed(2);
          avgAverageWeightedTotal = (avgAverageWeightedTotal / 3).toFixed(2);
          



            const newRow = {
                name: row.name,
                currentRank: row.currentRank,
                startingAsu: row.startingAsu,
                teaching: row.teaching,
                research: row.research,
                service: row.service,
                studentEvaluation: avgStudentEvaluation,
                course: avgCourse,
                teachingStudentMentor: avgTeachingStudentMentor,
                overall: avgOverall,
                publications: avgPublications,
                researchFunding: avgResearchFunding,
                researchStudentMentor: avgResearchStudentMentor,
                overall2: avgOverall2,
                internal: avgInternal,
                external: avgExternal,
                overall3: avgOverall3,
                weightedTotal: avgWeightedTotal,
                averageWeightedTotal: avgAverageWeightedTotal,
                color:1
            }


          processedData.push(newRow);
          newData.push(newRow);

          avgStudentEvaluation = 0;
            avgCourse = 0;
            avgTeachingStudentMentor = 0;
            avgOverall = 0;
            avgPublications = 0;
            avgResearchFunding = 0;
            avgResearchStudentMentor = 0;
            avgOverall2 = 0;
            avgInternal = 0;
            avgExternal = 0;
            avgOverall3 = 0;
            avgWeightedTotal = 0;
            avgAverageWeightedTotal = 0;
          count = 0;
        }

        count++;

        
      });

      processedData.sort((a, b) => {
        // Sort by averageWeightedTotal in descending order
        const diffTotal = parseFloat(b.averageWeightedTotal) - parseFloat(a.averageWeightedTotal);
        if (diffTotal !== 0) {
          return diffTotal;
        }
      
        // If averageWeightedTotal is the same, sort by name in ascending order
        const diffName = a.name.localeCompare(b.name);
        if (diffName !== 0) {
          return diffName;
        }
      
        // If both averageWeightedTotal and name are the same, prioritize row with color 1
        return a.color - b.color;
      });
      
        newData.sort((a, b) => parseFloat(b.averageWeightedTotal) - parseFloat(a.averageWeightedTotal));
        console.log(newData)
  
      // console.log(processedData);
  
      return res.status(200).json({
        success: true,
        body: processedData,
        newData,
        message: "entry created",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "user cannot be created",
      });
    }
  };

