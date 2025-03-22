import Scheme from '../models/Scheme.js';
import User from "../models/User.js";
// Controller to submit or release a new scheme (Admin-only)
export const releaseScheme = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { title, description, eligibilityCriteria,lastDateOfSubmission,documents } = req.body;

    // Check for required fields
    if (!title || !description || !eligibilityCriteria ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (title, description, eligibility criteria)',
      });
    }

    // Create a new scheme
    const scheme = new Scheme({
      title,
      description,
      eligibilityCriteria,
      lastDateOfSubmission,
      documents
    });

    // Save the scheme to the database
    await scheme.save();

    res.status(201).json({
      success: true,
      message: 'Scheme released successfully',
      scheme,
    });
  } catch (error) {
    console.error('Error releasing scheme:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while releasing the scheme',
    });
  }
};
export const viewAllSchemes = async (req, res) => {
  console.log("reached viewwallfunction")
  try {
    // Fetch all schemes from the database
    //made a change here for user data extraction
    const schemes = await Scheme.find().populate('appliedUsers.user');

    // Check if schemes exist
    if (!schemes || schemes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schemes found",
      });
    }

    // Return the list of schemes
    res.status(200).json({
      success: true,
      message: "Schemes retrieved successfully",
      schemes,
    });
  } catch (error) {
    console.error("Error retrieving schemes:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the schemes",
    });
  }
};

export const applyToScheme = async (req, res) => {
  console.log("Reached applyToScheme function");

  try {
    const {schemename, schemeId, documentLinks } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!schemeId || !documentLinks || Object.keys(documentLinks).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Scheme ID and all document links are required.",
      });
    }

    // Find the scheme
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has already applied
    const existingApplication = user.applications.find((app) => app.scheme.toString() === schemeId);
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this scheme.",
      });
    }

    // Validate if all required documents have links
    if (scheme.documents.some((doc) => !documentLinks[doc])) {
      return res.status(400).json({
        success: false,
        message: "Please provide links for all required documents.",
      });
    }

    // Add application with document links
    user.applications.push({
      schemename:schemename,
      scheme: schemeId,
      status: "pending",
      documentLinks,
    });
    await user.save();

    // Update applied users in the scheme
    scheme.appliedUsers.push({ user: userId, status: "pending" });
    await scheme.save();

    res.status(200).json({
      success: true,
      message: "Successfully applied to the scheme.",
    });
  } catch (error) {
    console.error("Error applying to scheme:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while applying to the scheme.",
    });
  }
};

/*try {
    const { schemeId, userId, status } = req.body; // Receive schemeId, userId, and status ("approved" or "rejected")

    // Validate input
    if (!schemeId || !userId || !status) {
      return res.status(400).json({
        success: false,
        message: "Scheme ID, User ID, and status are required",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: 'approved', 'rejected'",
      });
    }

    // Find the scheme
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the status in the Scheme's appliedUsers array
    const schemeApplication = scheme.appliedUsers.find(
      (app) => app.user.toString() === userId
    );

    if (!schemeApplication) {
      return res.status(400).json({
        success: false,
        message: "User has not applied for this scheme",
      });
    }

    schemeApplication.status = status; // Update status
    await scheme.save();

    // Update the status in the User's applications array
    const userApplication = user.applications.find(
      (app) => app.scheme.toString() === schemeId
    );

    if (!userApplication) {
      return res.status(400).json({
        success: false,
        message: "Scheme not found in user applications",
      });
    }

    userApplication.status = status; // Update status
    await user.save();

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating application status",
    });
  } */
export const approveOrRejectApplication = async (req, res) => {
  try {
    const { schemeId, userId, status } = req.body; // Receive schemeId, userId, and status ("approved" or "rejected")

    // Validate input
    if (!schemeId || !userId || !status) {
      return res.status(400).json({
        success: false,
        message: "Scheme ID, User ID, and status are required",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: 'approved', 'rejected'",
      });
    }

    // Find the scheme
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the status in the Scheme's appliedUsers array
    console.log(scheme.appliedUsers)
    const schemeApplication = scheme.appliedUsers.find(
      (app) => app.user.toString() === userId
    );

    if (!schemeApplication) {
      return res.status(400).json({
        success: false,
        message: "User has not applied for this scheme",
      });
    }

    schemeApplication.status = status; // Update status
    await scheme.save();

    // Update the status in the User's applications array
    const userApplication = user.applications.find(
      (app) => app.scheme.toString() === schemeId
    );

    if (!userApplication) {
      return res.status(400).json({
        success: false,
        message: "Scheme not found in user applications",
      });
    }

    userApplication.status = status; // Update status
    await user.save();

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating application status",
    });
  }
};
export const getschemenames = async (req, res) => {
  console.log("reached viewwallfunction")
  try {
   
    const schemes = await Scheme.find().select('title description _id')

    // Check if schemes exist
    if (!schemes || schemes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schemes found",
      });
    }

    // Return the list of schemes
    res.status(200).json({
      success: true,
      message: "Schemes retrieved successfully",
      schemes,
    });
  } catch (error) {
    console.error("Error retrieving schemes:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the schemes",
    });
  }
};
export const getparticular_schemedetails = async (req, res) => {
  console.log("reached get particular scheme details")
  try {
    const {schemeId} =req.body;
    const schemedetails = await Scheme.findById(schemeId);
    // Check if schemes exist
    if (!schemedetails || schemedetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No scheme with such id found",
      });
    }

    // Return the list of schemes
    res.status(200).json({
      success: true,
      message: "Scheme details retrieved successfully",
      schemedetails,
    });
  } catch (error) {
    console.error("Error retrieving scheme details:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the scheme details",
    });
  }
};

export const getparticular_studentapplication_details = async (req, res) => {
  console.log("reached get particular student details")
  try {
    const { studentId } = req.query;
    const studentdetails = await User.findById(studentId).select("name email applications");
    // Check if schemes exist
    if (!studentdetails || studentdetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student details not found",
      });
    }

    // Return the list of schemes
    res.status(200).json({
      success: true,
      message: "student details retrieved",
      studentdetails,
    });
  } catch (error) {
    console.error("Error retrieving student details:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the student details",
    });
  }
};

