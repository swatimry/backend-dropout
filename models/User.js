import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  dob: {
    type: Date,
    set: (value) => {
      if (!value) return value;
      const dobDate = new Date(value);
      return new Date(dobDate.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    }
  },    
  phone: { type: String },
  address: { type: String },
  state: { type: String },
  district: { type: String },
  resumeLink: { type: String },
  education: [
    {
      course: { type: String, required: true },
      marks: { type: Number, required: true },
      yearCompleted: { type: Number, required: true },
      field: { type: String, required: true }
    }
  ],

  // Dropout Details
  dropoutDetails: {
    dropoutCourse: { type: String },
    dropoutYear: { type: Number },
    dropoutInstitute: { type: String },
    dropoutReason: { type: String}
  },
  applications: [
    { schemename:String,
      scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      appliedAt: { type: Date, default: Date.now },
      documentLinks: { type: Map, of: String }
    },
  ]
});

export default mongoose.model('User', userSchema);
