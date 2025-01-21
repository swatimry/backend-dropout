import mongoose from 'mongoose';

// Define a sub-schema for the applied users
const appliedUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Accepted', 'Rejected'],
    default: 'Applied'
  },
  documentsSubmitted: [{
    type: String // List of document IDs or names submitted by the user
  }],
  additionalNotes: {
    type: String // Any additional notes or remarks from the admin about the application
  }
});

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
  // Array of applied users
  appliedUsers: [appliedUserSchema]
});

// Create and export the model
const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
