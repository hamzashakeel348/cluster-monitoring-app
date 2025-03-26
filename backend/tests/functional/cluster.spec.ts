import { test } from '@japa/runner';
import Cluster from 'App/Models/Cluster';

// Test case to create a new cluster
test('POST /clusters - create a new cluster', async ({ client, assert }) => {
  const clusterData = {
    name: 'Test Cluster',
    timeSeries: { IOPS: [], Throughput: [] },
  };

  const response = await client.post('/clusters').json(clusterData);

  response.assertStatus(201);
  response.assertBodyContains({ name: 'Test Cluster' });

  // Assert that the cluster was actually saved in the database
  const cluster = await Cluster.findById(response.body()._id);
  assert.isNotNull(cluster);
  assert.equal(cluster?.name, 'Test Cluster');
});

// Test case to get time series data for a cluster
test('GET /clusters/:id/ - get time series data', async ({
  client,
}) => {
  const clusterData = await Cluster.create({
    name: 'Test Cluster',
    timeSeries: {
      IOPS: [
        { timestamp: new Date(), read: 100, write: 200 },
        { timestamp: new Date(), read: 150, write: 250 },
      ],
      Throughput: [
        { timestamp: new Date(), read: 50, write: 60 },
        { timestamp: new Date(), read: 55, write: 65 },
      ],
    },
  });

  const response = await client.get(`/clusters/${clusterData._id}`);

  response.assertStatus(200);
  response.assertBodyContains({
    timeSeries: {
      IOPS: [
        { read: 100, write: 200 },
        { read: 150, write: 250 },
      ],
      Throughput: [
        { read: 50, write: 60 },
        { read: 55, write: 65 },
      ],
    },
  });
});

// Test case to handle missing cluster
test('GET /clusters/:id - handle missing cluster', async ({
  client,
}) => {
  const response = await client.get('/clusters/non-existing-id');

  response.assertStatus(400);
  response.assertBodyContains({ error: 'Invalid cluster ID' });
});
