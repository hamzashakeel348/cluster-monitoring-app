import mongoose from "mongoose";
import Cluster from "App/Models/Cluster";

class ClusterService {
  public async createCluster(clusterData: { name: string; timeSeries: any }) {
    if (!clusterData.name || !clusterData.timeSeries) {
      throw new Error("Invalid input data. Name and timeSeries are required.");
    }
    return await Cluster.create(clusterData);
  }

  public async getTimeSeries(clusterId: string) {
    if (!mongoose.isValidObjectId(clusterId)) {
      throw new Error("Invalid cluster ID");
    }

    const cluster = await Cluster.findById(clusterId);
    // Sort the time series data in descending order based on timestamps
    if (cluster) {
      // Handle IOPS time series data
      if (
        cluster.timeSeries &&
        cluster.timeSeries.IOPS &&
        Array.isArray(cluster.timeSeries.IOPS)
      ) {
        cluster.timeSeries.IOPS.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          // Sort in descending order (newest first)
          return timestampA - timestampB;
        });
      }

      // Handle Throughput time series data
      if (
        cluster.timeSeries &&
        cluster.timeSeries.Throughput &&
        Array.isArray(cluster.timeSeries.Throughput)
      ) {
        cluster.timeSeries.Throughput.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          // Sort in descending order (newest first)
          return timestampA - timestampB;
        });
      }
    }
    if (!cluster) {
      throw new Error("Cluster not found");
    }

    return { name: cluster.name, timeSeries: cluster.timeSeries };
  }
}

export default new ClusterService();
