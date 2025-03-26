import mongoose from "mongoose";
const TimeSeriesSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  read: { type: Number, required: true },
  write: { type: Number, required: true },
});

const ClusterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeSeries: {
    IOPS: [TimeSeriesSchema],
    Throughput: [TimeSeriesSchema], 
  },
});

const Cluster = mongoose.model("Cluster", ClusterSchema);
export default Cluster;
