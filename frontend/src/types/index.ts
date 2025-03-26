export interface TimeSeriesGraphProps {
  title: 'IOPS' | 'Throughput';
  data: Array<TimeSeriesData>;
  selectedDays: number;
}

export interface TimeSeriesData {
  timestamp: string;
  read: number;
  write: number;
}

export interface Schedule {
  type: string;
  snapshotTime: string;
  days: Array<string>;
}

export interface DeletePolicy {
  type: string;
  after: number;
  cadence: string;
}

export interface SnapshotPolicy {
  policyName: string;
  directoryPath: string;
  schedule: Schedule;
  deletePolicy: DeletePolicy;
  snapshotLocking: boolean;
  enablePolicy: boolean;
}

export interface SnapshotPolicyFormProps {
  policy: SnapshotPolicy;
  setPolicy: React.Dispatch<React.SetStateAction<SnapshotPolicy>>;
  onSubmit: (updatedPolicy: SnapshotPolicy) => void;
  loading: boolean;
}
