


const express= require("express");
const router= express.Router();


const {signup, login, resetPasswordToken, resetPassword}= require("../controller/auth");
const {auth, committee, nonCommittee, isAdmin}=require("../middlewares/auth");
const {committeeController}= require("../controller/CommitteeController")
const {facultyController}= require("../controller/FacultyController")
const {sabbaticalController}= require("../controller/SabbaticalController")
const {createAssignment, createSabbatical, createCommittee, createFaculty }= require("../controller/CreateController");
const { updateSabbatical, updateAssignment, updateCommittee, updateAggregate, updateFaculty } = require("../controller/UpdateController");
const {getCommitteeFromId, getAssignmentFromId, getFacultyFromId, getSabbaticalFromId }= require("../controller/UseidController")
const {deleteAssignment, deleteSabbatical, deleteCommittee, deleteFaculty}= require("../controller/DeleteController")
const {getAllAssignmentController, filterAssignmentController, filterFaculty, filterEvaluationController, filterAggregateController}= require("../controller/GetAllController")
const {roundRobinController}= require("../controller/RoundRobinController");


router.post("/signup", signup);
router.post("/login", login);


router.get("/committee", committeeController);

router.get("/faculty", facultyController);

router.get("/sabbatical", sabbaticalController);



router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);







router.get("/getallassignment", getAllAssignmentController);
router.get("/filterassignment/:rank",  filterAssignmentController);
router.get("/filterevaluation/:rank", auth, filterEvaluationController);
router.get("/filteraggregate/:rank", auth, filterAggregateController);
router.get("/filterfaculty/:rank", filterFaculty);








router.post("/createassignment", createAssignment );
router.post("/createcommittee", createCommittee );
router.post("/createfaculty", createFaculty );
router.post("/createsabbatical", createSabbatical );




router.post("/roundrobin", roundRobinController);










router.put("/updatecommittee/:id", updateCommittee );
router.put("/updateassignment/:id", updateAssignment );
router.put("/updatefaculty/:id", updateFaculty);
router.put("/updatesabbatical/:id", updateSabbatical);














router.get("/committeeid/:id", getCommitteeFromId);
router.get("/assignmentid/:id", getAssignmentFromId);
router.get("/facultyid/:id", getFacultyFromId);
router.get("/sabbaticalid/:id", getSabbaticalFromId);













router.post("/deletecommittee/:id", deleteCommittee )
router.post("/deleteassignment/:id", deleteAssignment )
router.post("/deletefaculty/:id", deleteFaculty )
router.post("/deletesabbatical/:id", deleteSabbatical )







// router.get("/assignments", isAdmin, sabbaticalController);


// router.get("/evaluationtro", committee, sabbaticalController);


// router.get("/aggregated", sabbaticalController);






module.exports=router;