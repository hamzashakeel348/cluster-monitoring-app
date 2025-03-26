import mongoose from 'mongoose';
import SnapshotPolicy from 'App/Models/SnapshotPolicy';

class SnapshotPolicyService {
  public async createSnapshotPolicy(clusterId: string, policyData: any) {
    if (!mongoose.isValidObjectId(clusterId)) {
      throw new Error('Invalid cluster ID');
    }

    const snapshotPolicy = new SnapshotPolicy({ ...policyData, clusterId });
    return await snapshotPolicy.save();
  }

  public async getSnapshotPolicy(clusterId: string) {
    if (!mongoose.isValidObjectId(clusterId)) {
      throw new Error('Invalid cluster ID');
    }

    const snapshotPolicy = await SnapshotPolicy.findOne({ clusterId });

    if (!snapshotPolicy) {
      throw new Error('Snapshot policy not found for this cluster');
    }

    return snapshotPolicy;
  }

  public async updateSnapshotPolicy(clusterId: string, policyData: any) {
    if (!mongoose.isValidObjectId(clusterId)) {
      throw new Error('Invalid cluster ID');
    }

    const snapshotPolicy = await SnapshotPolicy.findOne({ clusterId });

    if (!snapshotPolicy) {
      throw new Error('Snapshot policy not found for this cluster');
    }

    snapshotPolicy.set(policyData);
    return await snapshotPolicy.save();
  }
}

export default new SnapshotPolicyService();
