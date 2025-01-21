// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

export default mongoose.model('Application', ApplicationSchema);
