import { SnapshotPolicy } from '@/types';
import axios from '@/utils/axios';

export const getSnapshotPolicy = async (clusterId: string) => {
  try {
    console.log(clusterId)
    const response = await axios.get(`/clusters/${clusterId}/snapshot-policy`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching snapshot policy');
  }
};

export const updateSnapshotPolicy = async (
  clusterId: string,
  policyData: SnapshotPolicy
) => {
  try {
    const response = await axios.patch(
      `/clusters/${clusterId}/snapshot-policy`,
      policyData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating snapshot policy');
  }
};
