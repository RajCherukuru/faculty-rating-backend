

const committeeModel= require("../models/CommitteeModel");
const assignmentModel= require("../models/AssignmentModel");
const FacultyModel = require("../models/FacultyModel");
const SabbaticalModel = require("../models/SabbaticalModel");





exports.updateCommittee= async (req, res) =>{

    try{
    
        const {name, email, rank, year}= req.body;
        const id= req.params.id;
        console.log(name);
        
    
        console.log("ex")
    
        const updated= await committeeModel.findByIdAndUpdate({_id:id},{name, email, currentRank:rank, academicYear:year}, {new:true});
    
        console.log(updated)
        return res.status(200).json({
            status:true,
            message:"updated assignment"
        })
    
    
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"error in updating an assignment"
        })
    
    }
    
    }




    exports.updateAssignment = async (req, res) => {
        try {
          const {
            name,
            currentRank,
            startingAsu,
            teaching,
            research,
            service,
            studentEvaluation,
            course,
            teachingStudentMentor,
            notes,
            overall,
            publications,
            researchFunding,
            researchStudentMentor,
            notes2,
            overall2,
            internal,
            external,
            notes3,
            overall3,
            weightedTotal,
            assignment,
          } = req.body;
      
          const id = req.params.id;

          console.log("we are inside updated assignment controller")

          console.log("what is overall value", overall)

          const current= await assignmentModel.findOne({ _id: id });

          console.log(current);
          let overallModified=false;
          let overall2Modified=false;
          let overall3Modified=false;

          if (
            parseFloat(current.studentEvaluation) !== parseFloat(studentEvaluation) ||
            parseFloat(current.course) !== parseFloat(course) ||
            parseFloat(current.teachingStudentMentor) !== parseFloat(teachingStudentMentor)
          ) {
            overallModified = true;
          }
      
          console.log(overallModified);
      
          if (
            parseFloat(current.publications) !== parseFloat(publications) ||
            parseFloat(current.researchFunding) !== parseFloat(researchFunding) ||
            parseFloat(current.researchStudentMentor) !== parseFloat(researchStudentMentor)
          ) {
            overall2Modified = true;
          }
      
          if (
            parseFloat(current.internal) !== parseFloat(internal) ||
            parseFloat(current.external) !== parseFloat(external)
          ) {
            overall3Modified = true;
          }


      
          const updatedoverall = (studentEvaluation + course + teachingStudentMentor)/3;
          const updatedoverall2 = (publications + researchFunding + researchStudentMentor)/3;
          const updatedoverall3 = (internal + external)/2;
         

            const actualoverall= (overallModified) ? updatedoverall : overall
            const actualoverall2= (overall2Modified) ? updatedoverall2 : overall2
            const actualoverall3= (overall3Modified) ? updatedoverall3 : overall3

            console.log(actualoverall, actualoverall2, actualoverall3);

            const updatedweight =
            (teaching / 100) * actualoverall +
            (research / 100) * actualoverall2 +
            (service / 100) * actualoverall3;

      
          const updated = await assignmentModel.findByIdAndUpdate(
            { _id: id },
            {
              name,
              currentRank,
              startingAsu,
              teaching,
              research,
              service,
              studentEvaluation,
              course,
              teachingStudentMentor,
              notes,
              overall: actualoverall,
              publications,
              researchFunding,
              researchStudentMentor,
              notes2,
              overall2: actualoverall2,
              internal,
              external,
              notes3,
              overall3: actualoverall3,
              weightedTotal: updatedweight.toFixed(2),
              assignment,
            },
            { new: true }
          );
      
          const findName = updated.name;
      
          const avgWeighted = await assignmentModel.aggregate([
            { $match: { name: findName } },
            {
              $group: {
                _id: null,
                totalWeighted: { $sum: { $toDouble: "$weightedTotal" } },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                averageWeightedTotal: { $divide: ["$totalWeighted", "$count"] },
              },
            },
          ]);
      
          const totalavgweight = avgWeighted[0].averageWeightedTotal;
      
          const result = await assignmentModel.updateMany(
            { name: findName },
            { averageWeightedTotal: totalavgweight.toFixed(2) },
            { new: true }
          );
      
          // const check = await assignmentModel.find({ name: findName });
          // console.log("we are checking:", check);
      
          return res.status(200).json({
            status: true,
            message: "updated assignment",
          });
        } catch (err) {
          return res.status(500).json({
            status: false,
            message: "error in updating an assignment",
          });
        }
      };
      














    exports.updateFaculty = async (req, res) => {
      try {
        const {
          name,
          currentRank,
          startDate,
          teaching,
          research,
          service,
          studentEvaluation,
          course,
          teachingStudentMentor,
          notes,
          overall,
          publications,
          researchFunding,
          researchStudentMentor,
          notes2,
          overall2,
          internal,
          external,
          notes3,
          overall3,
          weightedTotal,
          assignment,
        } = req.body;
    
        const id = req.params.id;



        const previous = await FacultyModel.findByIdAndUpdate(
          { _id: id },
          {
            name,
            currentRank,
            startDate,
            teaching,
            research,
            service,
          },
        );


        const changeAssigment= await assignmentModel.updateMany({name:previous.name}, {$set: {name,
          currentRank,
          startingAsu: startDate,
          teaching,
          research,
          service,}})

          
    
        return res.status(200).json({
          status: true,
          message: "updated faculty",
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          message: "error in updating faculty",
        });
      }
    };
    





exports.updateSabbatical= async (req, res) =>{

  try{
  
      const {name, startDate, endDate, currentRank}= req.body;
      const id= req.params.id;
      console.log(name);
      
  
      console.log("ex")
  
      const updated= await SabbaticalModel.findByIdAndUpdate({_id:id},{name, startDate, endDate, currentRank}, {new:true});
  
      console.log(updated)
      return res.status(200).json({
          status:true,
          message:"updated assignment"
      })
  
  
  }catch(err){
      return res.status(500).json({
          status:false,
          message:"error in updating an assignment"
      })
  
  }
  
  }





 















