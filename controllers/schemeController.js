import Scheme from '../models/Scheme.js';

// Controller to submit or release a new scheme (Admin-only)
export const releaseScheme = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { title, description, eligibilityCriteria } = req.body;

    // Check for required fields
    if (!title || !description || !eligibilityCriteria) {
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
  try {
    // Fetch all schemes from the database
    const schemes = await Scheme.find();

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
