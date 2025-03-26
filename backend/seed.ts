import mongoose from "mongoose";
import Cluster from "./app/Models/Cluster";
import SnapshotPolicy from "./app/Models/SnapshotPolicy"; // Ensure correct path

// MongoDB Connection URI
const MONGO_URI = "mongodb://127.0.0.1:27017/cluster_db";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Function to generate 30 time series data points
const generateTimeSeries = (): {
  timestamp: Date;
  read: number;
  write: number;
}[] => {
  const timeSeries: { timestamp: Date; read: number; write: number }[] = [];
  const now = Date.now();
  const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000; // Timestamp for 5 days ago

  for (let i = 0; i < 30; i++) {
    // Keep 30 entries, but within last 5 days
    timeSeries.push({
      timestamp: new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo)), // Random timestamp in last 5 days
      read: Math.floor(Math.random() * 20000) + 2000, // Random read value (50-250)
      write: Math.floor(Math.random() * 30000) + 3000, // Random write value (30-180)
    });
  }

  return timeSeries;
};

const generateThroughPutTimeSeries = (): {
  timestamp: Date;
  read: number;
  write: number;
}[] => {
  const timeSeries: { timestamp: Date; read: number; write: number }[] = [];
  const now = Date.now();
  const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000; // Timestamp for 5 days ago

  for (let i = 0; i < 30; i++) {
    timeSeries.push({
      timestamp: new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo)),
      read: Math.floor(Math.random() * 200000) + 20000,
      write: Math.floor(Math.random() * 300000) + 30000,
    });
  }

  return timeSeries;
};

// Sample Cluster Data
const clusters = [
  {
    name: "Qumulo Cluster",
    timeSeries: {
      IOPS: generateTimeSeries(),
      Throughput: generateThroughPutTimeSeries(),
    },
  },
  {
    name: "Beta Cluster",
    timeSeries: {
      IOPS: generateTimeSeries(),
      Throughput: generateThroughPutTimeSeries(),
    },
  },
];

// Sample Snapshot Policy Data
const snapshotPolicies = [
  {
    policyName: "Daily Backup",
    directoryPath: "/var/backups",
    schedule: {
      type: "daily",
      snapshotTime: "02:00",
      days: ["Mon", "Tue", "Wed"],
    },
    deletePolicy: {
      type: "automatically",
      after: 30,
      cadence: "days",
    },
    snapshotLocking: false,
    enablePolicy: true,
  },
];

// Seed Function
const seedDB = async () => {
  try {
    await Cluster.deleteMany();
    await SnapshotPolicy.deleteMany(); // Clears old snapshot policies

    // Insert clusters and get their ObjectIds
    const insertedClusters = await Cluster.insertMany(clusters);
    console.log("Clusters Seeded Successfully ✅");

    // Assign clusterId to snapshot policies
    const snapshotPoliciesWithCluster = snapshotPolicies.map((policy) => ({
      ...policy,
      clusterId: insertedClusters[0]._id, // Assign to first cluster
    }));

    await SnapshotPolicy.insertMany(snapshotPoliciesWithCluster);
    console.log("Snapshot Policies Seeded Successfully ✅");
  } catch (error) {
    console.error("Error Seeding Database:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run Seeder
seedDB();
