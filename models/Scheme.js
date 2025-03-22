import mongoose from 'mongoose';



// Define the main Scheme schema
const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  eligibilityCriteria: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  issuingBody: {
    type: String
   
  },
  lastDateOfSubmission: {
    type: Date,
   
  },
  schemeType: {
    type: String,
    enum: ['Scholarship', 'Loan', 'Grant', 'Other'],
   
  },
  amountOrSupport: {
    type: String,
    
  },
  applicationProcess: {
    type: String,
   
  },
  requiredDocuments: [{
    type: String
  }],
  selectionProcess: {
    type: String,
    
  },
  durationOfSupport: {
    type: String,
    
  },
  termsAndConditions: {
    type: String
  },
  contactInformation: {
    type: String
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Upcoming'],
    default: 'Upcoming'
  },
  regionSpecific: {
    type: String
  },
  appliedUsers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Application status
    appliedAt: { type: Date, default: Date.now } // Date when the user applied
  }],
  documents:[{type:String}],
});

// Create and export the model
const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
