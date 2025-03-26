'use client';

import { useEffect, useState } from 'react';

import { getSnapshotPolicy, updateSnapshotPolicy } from '@/api/snapshotPolicy';
import SnapshotPolicyForm from '@/app/components/SnapshotPolicyForm';
import toast from 'react-hot-toast';

const clusterId = process.env.NEXT_PUBLIC_CLUSTER_ID || "";

const SnapshotPolicyPage = () => {
  const [policy, setPolicy] = useState({
    policyName: '',
    directoryPath: '',
    schedule: { type: 'daily', snapshotTime: '', days: ['Everyday'] },
    deletePolicy: { type: 'Never', after: 0, cadence: 'days' },
    snapshotLocking: false,
    enablePolicy: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const result = await getSnapshotPolicy(clusterId);
        setPolicy(result);
      } catch (err) {
        console.error(err);
        setError('Error fetching snapshot policy.');
      }
    };

    fetchPolicy();
  }, []);

  const handleSubmit = async (updatedPolicy: typeof policy) => {
    try {
      setLoading(true);
      await updateSnapshotPolicy(clusterId, updatedPolicy);
      toast.success('Snapshot policy updated.');
    } catch (err) {
      console.error(err);
      toast.error('Error in updating Snapshot policy.');
      setError('Error updating snapshot policy.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full bg-[#161A23] text-white'>
      <div className='flex justify-between lg:p-6 flex-col'>
        <h1 className='lg:text-2xl text-xl lg:m-4 my-8 mx-auto'>
          Edit Snapshot Policy
        </h1>
        {error && <p className='text-red-600'>{error}</p>}
        {!loading && (
          <SnapshotPolicyForm
            policy={policy}
            setPolicy={setPolicy}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default SnapshotPolicyPage;
