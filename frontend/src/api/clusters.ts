import axios from '@/utils/axios';

export const getClusterTimeSeries = async (clusterId: string) => {
  try {
    const response = await axios.get(`/clusters/${clusterId}`);
    return response.data;
  } catch (error) {
    console.log('error here: ', error);
    throw new Error('Error fetching time series data');
  }
};
