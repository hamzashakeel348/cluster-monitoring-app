import mongoose from 'mongoose';

const SnapshotPolicySchema = new mongoose.Schema({
  clusterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cluster',
    required: true,
  },
  policyName: { type: String, required: true, minlength: 3, maxlength: 100 },
  directoryPath: { type: String, required: true },
  schedule: {
    type: { type: String, enum: ['daily', 'weekly'], required: true },
    snapshotTime: { type: String, required: true },
    days: [String],
  },
  deletePolicy: {
    type: { type: String, enum: ['never', 'automatically'], required: true },
    after: { type: Number, required: false },
    cadence: { type: String, enum: ['days', 'months'], required: false },
  },
  snapshotLocking: { type: Boolean, default: false },
  enablePolicy: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SnapshotPolicy = mongoose.model('SnapshotPolicy', SnapshotPolicySchema);
export default SnapshotPolicy;
