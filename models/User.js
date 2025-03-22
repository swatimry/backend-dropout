import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
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
