const AssignmentModel = require("../models/AssignmentModel");
const CommitteeMember = require("../models/CommitteeModel");

exports.roundRobinController = async (req, res) => {
  try {
    const committeeMembers = await CommitteeMember.find({}).sort({ name: 1 }) ;
    const assignments = await AssignmentModel.find({}).sort({ currentRank:1,  name: 1 });

    const assignmentsCount = assignments.length;
    const committeeMembersCount = committeeMembers.length;

    const bulkOperations = [];

    for (let i = 0; i < assignmentsCount; i++) {
      const committeeMemberIndex = i % committeeMembersCount;
      const assignedCommitteeMember = committeeMembers[committeeMemberIndex];

      assignments[i].assignment = assignedCommitteeMember.name;

      bulkOperations.push({
        updateOne: {
          filter: { _id: assignments[i]._id },
          update: { assignment: assignedCommitteeMember.name },
        },
      });
    }

    await AssignmentModel.bulkWrite(bulkOperations);

    console.log("successfuly updated the round robin")

    res.status(200).json({ message: "Round-robin assignment completed" });
  } catch (error) {
    console.error("Error in round-robin assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
