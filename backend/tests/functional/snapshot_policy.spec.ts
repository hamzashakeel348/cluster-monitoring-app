import { test } from "@japa/runner";
import SnapshotPolicy from "App/Models/SnapshotPolicy";
import Cluster from "App/Models/Cluster";

// Test case to create snapshot policy for a cluster
test("POST /clusters/:id/snapshot-policy - create a new snapshot policy for a cluster", async ({
  client,
  assert,
}) => {
  const cluster = await Cluster.create({
    name: "Test Cluster",
    timeSeries: { IOPS: [], Throughput: [] },
  });

  const snapshotPolicyData = {
    clusterId: cluster._id,
    policyName: "Weekly Backup",
    directoryPath: "/backups",
    schedule: {
      type: "weekly",
      timezone: "UTC",
      snapshotTime: "07:00",
      days: ["Mon"],
    },
    deletePolicy: { type: "automatically", afterDays: 7 },
    snapshotLocking: true,
    enablePolicy: true,
  };

  const response = await client
    .post(`/clusters/${cluster._id}/snapshot-policy`)
    .json(snapshotPolicyData);

  response.assertStatus(201);
  response.assertBodyContains({ policyName: "Weekly Backup" });

  // Assert that the snapshotPolicyData was actually saved in the database
  const snapshotPolicy = await SnapshotPolicy.findById(response.body()._id);
  assert.isNotNull(snapshotPolicy);
  assert.equal(snapshotPolicy?.policyName, "Weekly Backup");
});

// Test case to get snapshot policy for a cluster
test("GET /clusters/:id/snapshot-policy - get snapshot policy", async ({
  client,
}) => {
  const cluster = await Cluster.create({
    name: "Test Cluster",
    timeSeries: { IOPS: [], Throughput: [] },
  });

  const snapshotPolicyData = {
    clusterId: cluster._id,
    policyName: "Weekly Backup",
    directoryPath: "/backups",
    schedule: {
      type: "weekly",
      timezone: "UTC",
      snapshotTime: "07:00",
      days: ["Mon"],
    },
    deletePolicy: { type: "automatically", afterDays: 7 },
    snapshotLocking: true,
    enablePolicy: true,
  };

  await client
    .post(`/clusters/${cluster._id}/snapshot-policy`)
    .json(snapshotPolicyData);

  const response = await client.get(`/clusters/${cluster._id}/snapshot-policy`);
  response.assertStatus(200);
  response.assertBodyContains({ policyName: "Weekly Backup" });
});

// // Test case to handle missing snapshot policy
test("GET /clusters/:id/snapshot-policy - handle missing snapshot policy", async ({
  client,
}) => {
  const response = await client.get("/clusters/dummy-id/snapshot-policy");

  response.assertStatus(400);
  response.assertBodyContains({
    error: "Invalid cluster ID",
  });
});
