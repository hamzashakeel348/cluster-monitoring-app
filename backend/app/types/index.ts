export interface TimeSeries {
  IOPS: Array<{ read: number; write: number; timestamp?: string }>;
  Throughput: Array<{ read: number; write: number; timestamp?: string }>;
}

export interface ClusterResponse {
  name: string;
  timeSeries: TimeSeries;
}
